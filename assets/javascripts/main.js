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
        var skyImage = queue.getResult('assets/images/level_0/sky.png'),
            groundImage = queue.getResult('assets/images/level_0/terrain_destroyed.png');
        Stage.sky.graphics.beginBitmapFill(skyImage, 'repeat-x').rect(0,0,Game.transformedSize.x,Game.transformedSize.y);
        Stage.ground.graphics.beginBitmapFill(groundImage, 'repeat-x').rect(0,0,Game.transformedSize.x, groundImage.height);
        Stage.ground.y = Game.transformedSize.y-groundImage.height;
    };

    var drawBackground = function() {
        var skyImage = queue.getResult('assets/images/level_0/sky.png'),
            groundImage = queue.getResult('assets/images/level_0/terrain_destroyed.png');
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
        Game.gameArea.setBounds(0,0,2980,1400);

        Game.transformedSize.x = 2980; //TODO: remove hardcode?
        Game.transformedSize.y = 1400;

        Stage.addChild(Game.gameArea);
    };

    var updateViewport = function() {
        var viewportTransformedWidth = Stage.canvas.width/Game.transformModifier,
            mouseModifier = (Stage.mouseX-Stage.canvas.width/2)/Stage.canvas.width*200,
            xpos = -1*(Player.x+Player.width/2 - viewportTransformedWidth/2)-mouseModifier;
        
        if(xpos < 0 && xpos > (Game.gameArea.getBounds().width-viewportTransformedWidth)*-1) {
            Game.gameArea.x = xpos;
        }

        var mouseYPercent = Stage.mouseY*100/Stage.canvas.height,
            viewportTransformedHeight = Stage.canvas.height/Game.transformModifier;

        // this last factoid added just for fancy slowdown effect on the top of the screen
        Game.gameArea.y = -1*(Game.gameArea.getBounds().height-viewportTransformedHeight)*mouseYPercent/100*(Stage.mouseY/Stage.canvas.height)/2;

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

            //used for collision detection (spatial partitioning)
            var QuadTreeRect = new createjs.Rectangle(0,0,
                Game.transformedSize.x,
                Game.transformedSize.y);
            Quadtree = new QuadTree(0, QuadTreeRect);

            /*
            *   Player
            */
            Player = new Player();
            Player.x = Game.transformedSize.x/2; // HARDCODE
            Player.y = Game.transformedSize.y-390; // HARDCODE
            Game.gameArea.addChild(Player);

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
            TestEnemy1 = new FormationClassicF1(100,200);
            Game.gameArea.addChild(TestEnemy1);

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