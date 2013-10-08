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
                    Game.controls.movementKeyPressed = KEYS.RIGHT
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
    //get a reference to the canvas element
    Stage = new createjs.Stage('mainCanvas');

    return {
        init: function() {
            Game.state = GAMESTATES.LOADED;

            //used for collision detection (spatial partitioning)
            var QuadTreeRect = new createjs.Rectangle(0,0,
                document.getElementById('mainCanvas').width,
                document.getElementById('mainCanvas').height);
            Quadtree = new QuadTree(0, QuadTreeRect);


            PlayerShip = new Player();
            PlayerShip.x = Game.canvasWidth/2; // HARDCODE
            PlayerShip.y = 590; // HARDCODE
            Stage.addChild(PlayerShip);

/**************************************************/
            var swarmRows = 3;
            var swarmCols = 3;
            var swarmHorizontalPadding = 50;
            Swarm1 = new Swarm(200, 150, swarmRows,swarmCols,swarmHorizontalPadding);


            Swarm1.x = Game.canvasWidth/2;
            Swarm1.y = 200;
            Stage.addChild(Swarm1);

            TestEnemy1 = new Enemy(false,69,50,0,100);
            Stage.addChild(TestEnemy1);

            TestEnemy2 = new Enemy(false,69,50,200,200);
            Stage.addChild(TestEnemy2);

            for (i=0; i < 1280; i+=40) {
                for (j=640; j<= 680; j+=40) {
                    var f = new GroundPiece("", i, j);
                    Stage.addChild(f);
                }
            };

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener('tick', update);
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
            document.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('contextmenu', handleContextMenu);
        },
        controls: {
            movementKeyPressed: undefined,
            leftMouseDown: false,
            rightMouseDown: false
        },
        colliders : [],
        debug : true,
        canvasWidth : document.getElementById('mainCanvas').width
    }
}();