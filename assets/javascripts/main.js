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

var Game, Player, Stage, EnemyShip, Swarm1;

Game = function() {
    /*
    * Called on every tick
    * */
    var update = function() {
        Stage.update();

    }
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
        Game.controls.mouseDown = true;
    };
    var handleMouseUp = function(event) {
        Game.controls.mouseDown = false;
    };

    return {
        init: function() {
            Game.state = GAMESTATES.LOADED;

            //get a reference to the canvas element

            Stage = new createjs.Stage('mainCanvas');

            

            PlayerShip = new Player();
            PlayerShip.x = Game.canvasWidth/2; // HARDCODE
            PlayerShip.y = 590; // HARDCODE
            Stage.addChild(PlayerShip);


/**************************************************/

            var swarmRows = 3;
            var swarmCols = 6;
            var swarmHorizontalPadding = 50;
            enemiesToAdd = swarmRows * swarmCols;

            Swarm1 = new Swarm(swarmRows,swarmCols,swarmHorizontalPadding);
            Swarm1.x = Game.canvasWidth/2;
            Swarm1.y = 200;


            for (var i = 0; i < enemiesToAdd ; i++){
                var row = Math.floor(i/swarmCols);
                var col = i - swarmCols*Math.floor(i/swarmCols);
                Swarm1.addShip(new Enemy(true,69,50), [row,col]);
            }
            Stage.addChild(Swarm1);
/***************************************************/

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener('tick', update);
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
            document.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mouseup', handleMouseUp)
        },
        controls: {
            movementKeyPressed: undefined,
            mouseDown: false
        },
        bullets : [],
        debug : false,
        canvasWidth : document.getElementById('mainCanvas').width
    }
}();