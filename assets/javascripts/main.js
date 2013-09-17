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

var Game, Player, Stage;

Game = function() {
    var movementKeyPressed;
    var bullets = [];
    /*
    * Called on every tick
    * */
    var update = function() {
        // Player character movement
        if(typeof movementKeyPressed != 'undefined') {
            switch(movementKeyPressed) {
                case KEYS.LEFT:
                    if(Player.x > 0) {
                        Player.x -= 10;
                    }
                break;
                case KEYS.RIGHT:
                    if(Player.x < 500) { // KILL ALL HARDCODE
                        Player.x += 10;
                    }
                break;
            }
        }
        // bullets
        _(Stage.children).each(function(child) {
            if(child.update) {
                child.update();
            }
        });
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
                    movementKeyPressed = KEYS.LEFT;
                break;
                case 39: // right
                    movementKeyPressed = KEYS.RIGHT
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
                case 39:
                    movementKeyPressed = undefined;
            }
        }
    };
    /*
    * Handle Click event on Stage, release a bullet
    * */
    var handleStageClick = function(event) {
        fireBullet(Stage.mouseX, Stage.mouseY);
    };
    var fireBullet = function(x, y) {
        var bullet = _.extend({}, Projectile).init(Player.x, Player.y, x, y);
        bullets.push(bullet);
    }

    return {
        init: function() {
            Game.state = GAMESTATES.LOADED;

            Stage = new createjs.Stage('mainCanvas');
            Player = new createjs.Shape();
            Player.graphics.beginFill('red').drawCircle(0,0,50);
            Player.x = 10;
            Player.y = 450;
            Stage.addChild(Player);

            createjs.Ticker.addEventListener('tick', update);
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            Stage.canvas.addEventListener('click', handleStageClick);
        }
    }
}();