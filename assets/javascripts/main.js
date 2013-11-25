const GAMESTATES = {
    STOPPED: 0,
    LOADING: 1,
    LOADED:  2,
    STARTED: 3
};

const KEYS =  {
    LEFT:  0,
    RIGHT: 1
};

var Game, Quadtree, Player, Stage, EnemyShip, Swarm1, Facility1;

Game = function() {
    /*
    * Called on every tick
    * */
    var update = function() {
        Stage.update();
        Collision.QuadtreeTick(Game, Quadtree, Game.gameArea);
        SpawnEngineTick();
        updateViewport();
    };
    /*
    *   Sounds
    */
    var loadSounds = function() {
        // if initializeDefaultPlugins returns false, we cannot play sound in this browser
        if (!createjs.Sound.initializeDefaultPlugins()) {return;}
        var audioPath = "assets/sounds/";
        var manifest = [
            {id:"enemy_shoot",  src:audioPath+"enemy/enemy_shoot.wav"},
            {id:"cannon",       src:audioPath+"player_ship/cannon.wav"},
            {id:"turret_shoot", src:audioPath+"turret/turret_shoot.wav"}
        ];

        createjs.Sound.registerManifest(manifest);
    };
    /* 
    * Handle KeyDown event on window,
    * mark if any control keys are pressed
    * */
    var handleKeyDown = function(event) {
        if(Game.state == GAMESTATES.LOADED) {
            switch(event.keyCode) {
                case 37: // left
                case 65: // a
                    Game.controls.movementKeyReleased = undefined;
                    Game.controls.movementKeyPressed = KEYS.LEFT;
                break;
                case 39: // right
                case 68: // d
                    Game.controls.movementKeyReleased = undefined;
                    Game.controls.movementKeyPressed = KEYS.RIGHT;
                break;
            }
        }
    };
    /*
    * Handle KeyUp event on window,
    * reset control key status
    * */
    var handleKeyUp = function(event) {
        if(Game.state == GAMESTATES.LOADED) {
            switch(event.keyCode) {
                case 37: // left
                case 65: // a
                    if(Game.controls.movementKeyPressed == KEYS.LEFT) {
                        Game.controls.movementKeyPressed = undefined;
                        Game.controls.movementKeyReleased = KEYS.LEFT;
                    }
                break;
                case 39: // right
                case 68: // d
                    if(Game.controls.movementKeyPressed == KEYS.RIGHT) {
                        Game.controls.movementKeyPressed = undefined;
                        Game.controls.movementKeyReleased = KEYS.RIGHT;
                    }
                break;
            }
        }
    };
    /*
    * Handle Click event on Stage, release a bullet
    * */
    var handleMouseDown = function(event) {
        switch(event.which) {
            case 1:
                Game.controls.leftMouseDown = true;
            break;
            case 3:
                Game.controls.rightMouseDown = true;
            break;
        }
    };
    var handleMouseUp = function(event) {
        switch(event.which) {
            case 1:
                Game.controls.leftMouseDown = false;
            break;
            case 3:
                Game.controls.rightMouseDown = false;
            break;
        }
    };
    var handleContextMenu = function(event) {
        // prevent browser from opening a context menu
        event.preventDefault();
    };
    var handleFullscreenClick = function() {
        var canvas = document.getElementById('mainCanvas');
        canvas.webkitRequestFullscreen();
    };
    var handleFullscreenChange = function() {
        var canvas = document.getElementById('mainCanvas');
        if(document.webkitCurrentFullScreenElement) {
            canvas.height = screen.height;
            canvas.width = screen.width;
        } else {
            canvas.height = 720;
            canvas.width = 1280;
        }
        Game.transformModifier = Stage.canvas.clientHeight/1080;
        /*Game.transformedSize = {
            x: canvas.width/Game.transformModifier,
            y: canvas.height/Game.transformModifier
        };*/
        Stage.setTransform(0, 0, Game.transformModifier, Game.transformModifier);
        // redraw background
        var skyImage = queue.getResult('sky'),
            groundImage = queue.getResult('terrain_destroyed');
        Stage.sky.graphics.beginBitmapFill(skyImage, 'repeat-x').rect(0,0,Game.transformedSize.x,Game.transformedSize.y);
        Stage.ground.graphics.beginBitmapFill(groundImage, 'repeat-x').rect(0,0,Game.transformedSize.x, groundImage.height);
        Stage.ground.y = Game.transformedSize.y-groundImage.height;
    };
    
    var drawBackground = function() {
        var skyImage = queue.getResult('sky'),
            groundImage = queue.getResult('terrain_destroyed');
        Stage.sky = new createjs.Shape();
        Stage.ground = new createjs.Shape();
        Stage.sky.graphics.beginBitmapFill(skyImage, 'repeat-x').rect(0,0,Game.transformedSize.x,Game.transformedSize.y);
        Stage.ground.graphics.beginBitmapFill(groundImage, 'repeat-x').rect(0,0,Game.transformedSize.x, groundImage.height);
        
        Game.gameArea.addChild(Stage.sky);
        Game.gameArea.addChild(Stage.ground);
        Stage.ground.y = Game.transformedSize.y-groundImage.height;
    };

    var createViewport = function() {
        Game.gameArea = new createjs.Container();
        Game.gameArea.setBounds(0,0,4470,2100);

        Game.transformedSize.x = 4470; //TODO: remove hardcode?
        Game.transformedSize.y = 2100;

        Stage.addChild(Game.gameArea);
    };

    var updateViewport = function() {
        var mouseYPercent,
            mouseXModifier;

        if(Stage.mouseY === 0 && Stage.mouseX === 0 && !$(Stage.canvas).is(':hover')) { // TODO: somehow NOT check it with jQuery?
            // If we're not hovering the canvas, assume the mouse is in middle right
            mouseYPercent = 100;
            mouseXModifier = 0;
        } else {
            mouseYPercent = Stage.mouseY*100/Stage.canvas.height;
            mouseXModifier = ((Stage.mouseX-Stage.canvas.width/2)/Stage.canvas.width*200);
        }
        
        var transmod = 1,
            ypos,
            xpos;
        if(mouseYPercent < 30) {
            // if mouse is in top 30%, zoom out
            transmod = 0.2/15*mouseYPercent+9/15;
        }

        var viewportTransformedHeight = Stage.canvas.height/Game.transformModifier/transmod,
            viewportHeightOnePercent = (Game.gameArea.getBounds().height-viewportTransformedHeight)/100;
        
        if(mouseYPercent < 30) {
            // if mouse is in top 30%, position viewport so that player is on botto edge
            ypos = -1*((PlayerFortress.y+PlayerFortress.height)-viewportTransformedHeight)*transmod;
        } else {
            ypos = -1*viewportHeightOnePercent*(3/7*mouseYPercent+400/7);
        }

        var viewportTransformedWidth = Stage.canvas.width/Game.transformModifier/transmod,
            playerCenter = (PlayerFortress.x+PlayerFortress.width/2)*transmod;

        // horisontally centered on player +- mouse X modifier, as calculated previously
        xpos = -1*(playerCenter-viewportTransformedWidth/(2/transmod))-mouseXModifier*transmod;

        if(xpos > 0) {
            // do not allow bigger than 0 (over left edge)
            xpos = 0;
        } else if(Game.gameArea.getBounds().width-(-1)*xpos/transmod<viewportTransformedWidth) {
            // do not allow smaller than gameArea width - viewport width (over right edge)
            xpos = -1*(Game.gameArea.getBounds().width-viewportTransformedWidth)*transmod;
        }

        // set transformation - position and zoom level
        Game.gameArea.setTransform(xpos,ypos,transmod,transmod);
    };

    //get a reference to the canvas element
    Stage = new createjs.Stage('mainCanvas');
    Stage.snapToPixelEnabled = true;

    return {
        init: function() {
            Game.state = GAMESTATES.LOADED;
            createViewport();
            drawBackground();
            handleFullscreenChange();
            loadSounds();

            //used for collision detection (spatial partitioning)
            var QuadTreeRect = new createjs.Rectangle(0,0,
                Game.transformedSize.x,
                Game.transformedSize.y);
            Quadtree = new QuadTree(0, QuadTreeRect);

            /*
            *   Player
            */
            PlayerFortress = new Player();
            PlayerFortress.x = Game.transformedSize.x/2; // HARDCODE
            PlayerFortress.y = Game.transformedSize.y-390; // HARDCODE
            Game.gameArea.addChild(PlayerFortress);

            /*
            *   HUD
            */
            HUD = new HUD();
            Stage.addChild(HUD);

            /*
            *   Orbital Defence
            */
            OrbitalDefence1 = new OrbitalDefence(200,450);
            Game.gameArea.addChild(OrbitalDefence1);
            OrbitalDefence2 = new OrbitalDefence(600,450);
            Game.gameArea.addChild(OrbitalDefence2);
            OrbitalDefence3 = new OrbitalDefence(1000,450);
            Game.gameArea.addChild(OrbitalDefence3);

            /*
            *   Enemies
            */
            TestEnemy1 = new FormationClassicF1(600,swarmCommon.stateBorders.SPAWNED);
            Game.gameArea.addChild(TestEnemy1);

            /*
            *   Facility
            */
            Facility1 = new Facility(200, Game.transformedSize.y-350);
            Game.gameArea.addChild(Facility1);
            Facility2 = new Facility(800, Game.transformedSize.y-350);
            Game.gameArea.addChild(Facility2);
            Facility3 = new Facility(1200, Game.transformedSize.y-350);
            Game.gameArea.addChild(Facility3);
            Facility4 = new Facility(2000, Game.transformedSize.y-350);
            Game.gameArea.addChild(Facility4);
            Facility5 = new Facility(2200, Game.transformedSize.y-350);
            Game.gameArea.addChild(Facility5);

            /*
            *   Turrets
            */
            Turret1 = new PlanetaryTurretBaseHigh(400, Game.transformedSize.y-329);
            Game.gameArea.addChild(Turret1);
            Turret2 = new PlanetaryTurretBaseLow(1000, Game.transformedSize.y-314);
            Game.gameArea.addChild(Turret2);
            Turret3 = new PlanetaryTurretBaseLow(1800, Game.transformedSize.y-314);
            Game.gameArea.addChild(Turret3);
            
            /*
            *   Ground tiles
            */
            for (i=0; i < Game.transformedSize.x; i+=22) {
                var g = new GroundColumn();
                g.x = i;
                g.y = Game.transformedSize.y-286;
                Game.gameArea.addChild(g);
            }

            /*
            *   Misc
            */
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener('tick', update);
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
            Stage.canvas.addEventListener('mousedown', handleMouseDown);
            Stage.canvas.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('contextmenu', handleContextMenu);
            document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

            document.getElementById('gofullscreen').addEventListener('click', handleFullscreenClick);
        },
        controls: {
            movementKeyPressed: undefined,
            movementKeyReleased: undefined,
            leftMouseDown: false,
            rightMouseDown: false
        },
        factions: {
            humans: 0,
            aliens: 1
        },
        debug : false,
        godmode: false,
        transformedSize: {
            x: 1280,
            y: 720
        }
    };
}();