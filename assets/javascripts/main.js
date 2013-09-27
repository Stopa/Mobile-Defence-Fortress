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
        Game.controls.mouseDown = true;
    };
    var handleMouseUp = function(event) {
        Game.controls.mouseDown = false;
    };

    return {
        init: function() {
            Game.state = GAMESTATES.LOADED;

            Stage = new createjs.Stage('mainCanvas');
            PlayerShip = new Player();
            PlayerShip.x = 200; // HARDCODE
            PlayerShip.y = 590; // HARDCODE
            Stage.addChild(PlayerShip);


/**************************************************/


            //EnemyShip = new Enemy();
            //EnemyShip.x = 200;
            //EnemyShip.y = 200;
            //Stage.addChild(EnemyShip);



            Swarm1 = new Swarm(200);

            Swarm1.addChild(new Enemy(true));
            Swarm1.addChild(new Enemy(true));
            Swarm1.addChild(new Enemy(true));

            Swarm1.x = 200;
            Swarm1.y = 200;

            for (var i = 0; i < 3 ; i++){
                Swarm1.children[i].x=-100 + (i*100);
            }
            Stage.addChild(Swarm1);
            //Stage.addChild(EnemyShip);

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
        }
    }
}();