(function(window) {
    function Player() {
        this.initialize();
    }
    Player.prototype = new Actor();
    Player.prototype.actorInit = Player.prototype.initialize;
    Player.prototype.actorTick = Player.prototype._tick;

    Player.prototype.initialize = function() {
        this.actorInit();
        this._initGraphics();
    }

    Player.prototype._tick = function() {
        this.actorTick();
        this.tickMovement();
    }

    Player.prototype._initGraphics = function() {
        this.hull = new BasicHull();
        this.weapon = new Cannon();

        this.weapon.x = this.hull.width/2;
        this.weapon.y = 7; // HARDCODE

        this.addChild(this.weapon);
        this.addChild(this.hull);
    }

    Player.prototype.tickMovement = function() {
        switch(Game.controls.movementKeyPressed) {
            case KEYS.LEFT:
                this.moveLeft();
            break;
            case KEYS.RIGHT:
                this.moveRight();
            break;
        }
    }

    Player.prototype.moveLeft = function() {
        if(this.x > 0) {
            this.x -= this.baseMovementSpeed;
        }
    }

    Player.prototype.moveRight = function() {
        if(this.x < Stage.canvas.clientWidth-this.hull.width) {
            this.x += this.baseMovementSpeed;
        }        
    }

    Player.prototype.getHitpoints = function() {
        /**
        *   Temporarily returns base hitpoints, in the future
        *   should return actual hitpoints.
        */
        return this.baseHitpoints;
    }

    Player.prototype.baseMovementSpeed = 10;

    window.Player = Player;
}(window));