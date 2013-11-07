const GAMESTATES = {
    STOPPED: 0,
    LOADING: 1,
    LOADED:  2,
    STARTED: 3
}

const KEYS =  {
    LEFT:  0,
    RIGHT: 1
}

var Game, Quadtree, Player, Stage, EnemyShip, Swarm1, Facility1;

Game = function() {
    /*
    * Called on every tick
    * */
    var update = function() {
        Stage.update();
        Collision.QuadtreeTick(Game, Quadtree, Stage);
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
                    Game.controls.movementKeyPressed = KEYS.LEFT;
                break;
                case 39: // right
                case 68: // d
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
                    }
                break;
                case 39: // right
                case 68: // d
                    if(Game.controls.movementKeyPressed == KEYS.RIGHT) {
                        Game.controls.movementKeyPressed = undefined;
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
        Game.transformedSize = {
            x: canvas.width/Game.transformModifier,
            y: canvas.height/Game.transformModifier
        };
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
        
        Stage.addChild(Stage.sky);
        Stage.addChild(Stage.ground);
        Stage.ground.y = Game.transformedSize.y-groundImage.height;
    };

    //get a reference to the canvas element
    Stage = new createjs.Stage('mainCanvas');

    return {
        init: function() {
            Game.state = GAMESTATES.LOADED;
            drawBackground();
            handleFullscreenChange();

            //used for collision detection (spatial partitioning)
            var QuadTreeRect = new createjs.Rectangle(0,0,
                Game.transformedSize.x,
                Game.transformedSize.y);
            Quadtree = new QuadTree(0, QuadTreeRect);


            Player = new Player();
            Player.x = Game.transformedSize.x/2; // HARDCODE
            Player.y = Game.transformedSize.y-400; // HARDCODE
            Stage.addChild(Player);

            HUD = new HUD();
            Stage.addChild(HUD);

            OrbitalDefence1 = new OrbitalDefence(200,450);
            Stage.addChild(OrbitalDefence1);
            OrbitalDefence2 = new OrbitalDefence(600,450);
            Stage.addChild(OrbitalDefence2);
            OrbitalDefence3 = new OrbitalDefence(1000,450);
            Stage.addChild(OrbitalDefence3);

/**************************************************/
            TestEnemy1 = new Enemy(35,100);
            Stage.addChild(TestEnemy1);

            TestEnemy2 = new Enemy(200,200);
            Stage.addChild(TestEnemy2);

            //Add ground tiles
            for (i=0; i < Game.transformedSize.x; i+=22) {
                for (j=Game.transformedSize.y-295; j<= Game.transformedSize.y; j+=22) {
                    var f = new GroundPiece("");
                    f.x = i;
                    f.y = j;
                    Stage.addChild(f);
                }
            }

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener('tick', update);
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
            document.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('contextmenu', handleContextMenu);
            document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

            document.getElementById('gofullscreen').addEventListener('click', handleFullscreenClick);
        },
        controls: {
            movementKeyPressed: undefined,
            leftMouseDown: false,
            rightMouseDown: false
        },
        factions: {
            humans: 0,
            aliens: 1
        },
        debug : true,
        godmode: false,
        transformedSize: {
            x: 1280,
            y: 720
        }
    }
}();