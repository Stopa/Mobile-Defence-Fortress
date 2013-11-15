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
    };

    Player.prototype._tick = function() {
        this.actorTick();
        this.tickMovement();
        this._tickPrimaryWeapon();
        this._tickSecondaryWeapon();
    };

    Player.prototype._initGraphics = function() {
        this.hull = new BasicHull();

        //describe some dimensions for the player, used for collision:
        this.width = this.hull.width;
        this.height = this.hull.height;

        this.primaryWeapon = new Cannon();
        this.primaryWeapon.x = 32;
        this.primaryWeapon.y = 26; // HARDCODE

        this.secondaryWeapon = new PointDefence();
        this.secondaryWeapon.x = 86;
        this.secondaryWeapon.y = 21; // HARDCODE

        this.addChild(this.primaryWeapon);
        this.addChild(this.secondaryWeapon);
        this.addChild(this.hull);
    };

    Player.prototype.tickMovement = function() {
        switch(Game.controls.movementKeyPressed) {
            case KEYS.LEFT:
                this.moveLeft();
            break;
            case KEYS.RIGHT:
                this.moveRight();
            break;
        }
        switch(Game.controls.movementKeyReleased) {
            case KEYS.LEFT:
                this.moveLeftInertion();
            break;
            case KEYS.RIGHT:
                this.moveRightInertion();
            break;
        }
    };

    Player.prototype._tickPrimaryWeapon = function() {
        if(this.primaryWeapon && !this.primaryWeapon.isAutomatic) {
            this.primaryWeapon.rotateToCursor();
            if(Game.controls.leftMouseDown) {
                this.primaryWeapon.shoot();
            }
        }
    };

    Player.prototype._tickSecondaryWeapon = function() {
        if(this.secondaryWeapon && !this.secondaryWeapon.isAutomatic) {
            this.secondaryWeapon.rotateToCursor();
            if(Game.controls.rightMouseDown) {
                this.secondaryWeapon.shoot();
            }
        }
    };

    Player.prototype.moveLeft = function() {
        if(this.x > 0) {
            this.currentMovementInertion = this.baseMovementInertion;
            this.x -= this.baseMovementSpeed;
        }
    };

    Player.prototype.moveLeftInertion = function() {
        if(this.x > 0 && this.currentMovementInertion > 0) {
            this.x -= this.currentMovementInertion;
            this.currentMovementInertion -= 0.05;
        }
    };

    Player.prototype.moveRight = function() {
        if(this.x < Game.transformedSize.x-this.hull.width) {
            this.currentMovementInertion = this.baseMovementInertion;
            this.x += this.baseMovementSpeed;
        }
    };

    Player.prototype.moveRightInertion = function() {
        if(this.x < Game.transformedSize.x-this.hull.width && this.currentMovementInertion > 0) {
            this.x += this.currentMovementInertion;
            this.currentMovementInertion -= 0.05;
        }
    };

    Player.prototype.getHitpoints = function() {
        /**
        *   Temporarily returns base hitpoints, in the future
        *   should return actual hitpoints.
        */
        return this.baseHitpoints;
    };

    Player.prototype.collision = function(object) {
        if (!Game.godmode) this.takesDamage(10); // HARDCODE
    };

    Player.prototype.baseMovementSpeed = 5;
    Player.prototype.baseMovementInertion = 5;
    Player.prototype.currentMovementInertion = 0;

    window.Player = Player;
}(window));