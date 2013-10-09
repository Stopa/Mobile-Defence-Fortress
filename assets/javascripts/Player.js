(function(window) {
    function Player() {
        this.initialize();
    }
    Player.prototype = new Actor();
    Player.prototype.actorInit = Player.prototype.initialize;
    Player.prototype.actorTick = Player.prototype._tick;

    Player.prototype.initialize = function() {
        this.actorInit();
        this.faction =  Game.factions.humans;
        this._initGraphics();
    }

    Player.prototype._tick = function() {
        this.actorTick();
        this.tickMovement();
        this._tickPrimaryWeapon();
    }

    Player.prototype._initGraphics = function() {
        this.hull = new BasicHull();
        this.primaryWeapon = new Cannon();

        this.primaryWeapon.x = this.hull.width/2;
        this.primaryWeapon.y = 7; // HARDCODE

        this.addChild(this.primaryWeapon);
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

    Player.prototype._tickPrimaryWeapon = function() {
        if(this.primaryWeapon) {
            this.primaryWeapon.rotateToCursor();
            if(Game.controls.leftMouseDown) {
                this.primaryWeapon.shoot();
            }
        }
    };

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

    Player.prototype.collision = function(object) {
        this.baseHitpoints -= 101; // HARDCODE
    }

    Player.prototype.baseMovementSpeed = 5;

    window.Player = Player;
}(window));