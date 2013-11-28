(function(window) {
    function OrbitalDefence(x,y) {
        this.initialize(x,y);
    }
    OrbitalDefence.prototype = new Destructible();
    OrbitalDefence.prototype.destructibleInit = OrbitalDefence.prototype.initialize;
    OrbitalDefence.prototype.destructibleTick = OrbitalDefence.prototype._tick;
    OrbitalDefence.prototype.destructibleDie = OrbitalDefence.prototype._die;

    OrbitalDefence.prototype.initialize = function(x,y) {
        this.destructibleInit();

        this.x = x;
        this.y = y;

        this.originalX = x;

        this.faction = Game.factions.humans;

        this._initGraphics();
    };

    OrbitalDefence.prototype._tick = function() {
        this.destructibleTick();
        this._tickMovement();
    };

    OrbitalDefence.prototype._initGraphics = function() {
        var orbitalDefence = queue.getResult('orbitalDefence');
        this.orbitalDefenceBitmap = new createjs.Bitmap(orbitalDefence);

        this.orbitalDefenceBitmap.scaleX = 1/2;
        this.orbitalDefenceBitmap.scaleY = 1/4;

        this.width= this.orbitalDefenceBitmap.scaleX * 256;  //hardcode
        this.height=this.orbitalDefenceBitmap.scaleY * 256;

        this.addChild(this.orbitalDefenceBitmap);
    };

    OrbitalDefence.prototype._tickMovement = function() {
        // Random direction when the orbital defence first starts moving
        if (this.currentMovementDirection === 0) this.currentMovementDirection = Math.random() < 0.5 ? -1 : 1;

        this.x += this.movementSpeed*this.currentMovementDirection;

        if (Math.abs(this.originalX - this.x) > this.movementRange) {
            this.currentMovementDirection = this.currentMovementDirection*-1;
        }
    };

    OrbitalDefence.prototype.collision = function(object){
    };

    OrbitalDefence.prototype.baseHitpoints = 30;
    OrbitalDefence.prototype.movementRange = 100;
    OrbitalDefence.prototype.movementSpeed = 1;
    OrbitalDefence.prototype.currentMovementDirection = 0;
    OrbitalDefence.prototype.originalX = 0;

    window.OrbitalDefence = OrbitalDefence;
}(window));