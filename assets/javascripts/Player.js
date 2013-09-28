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
                if(this.x > 0) {
                    this.x -= 10; // HARDCODE: ship speed
                }
            break;
            case KEYS.RIGHT:
                if(this.x < Stage.canvas.clientWidth-this.hull.width) {
                    this.x += 10; // HARDCODE: ship speed
                }
            break;
        }
    }

    window.Player = Player;
}(window));