(function(window) {
    function PlanetaryTurretBaseLow(x, y) {
        this.initialize(x, y);
    }
    PlanetaryTurretBaseLow.prototype = new Actor();
    PlanetaryTurretBaseLow.prototype.actorInit = PlanetaryTurretBaseLow.prototype.initialize;
    PlanetaryTurretBaseLow.prototype.actorTick = PlanetaryTurretBaseLow.prototype._tick;

    PlanetaryTurretBaseLow.prototype.initialize = function(x, y) {
        this.actorInit();

        this.x = x;
        this.y = y;
        
        this.faction =  Game.factions.humans;

        this.pointDefence = new PointDefence();
        this.pointDefence.x = 18;
        this.pointDefence.y = 15; // HARDCODE
        this.pointDefence.scaleX = 0.7;
        this.pointDefence.scaleY = 0.7;
        this.addChild(this.pointDefence);
        
        this.graphics = this._initGraphics();
    };

    PlanetaryTurretBaseLow.prototype._tick = function() {
        this.actorTick();
    };

    PlanetaryTurretBaseLow.prototype._initGraphics = function() {
        this.width = 37;
        this.height = 28;
        this.PlanetaryTurretBaseLowBitmap = new createjs.Bitmap(
            'assets/images/turret/planetary_turret_base_low.png');
        this.addChild(this.PlanetaryTurretBaseLowBitmap);
        return this.PlanetaryTurretBaseLowBitmap;
    };

    PlanetaryTurretBaseLow.prototype.getHitpoints = function() {
        /**
        *   Temporarily returns base hitpoints, in the future
        *   should return actual hitpoints.
        */
        return this.baseHitpoints;
    };

    PlanetaryTurretBaseLow.prototype.collision = function(object) {
        if (!Game.godmode) this.takesDamage(50); // HARDCODE
        if (this.getHitpoints() <= 0) {
            this._die();
        }
    };

    PlanetaryTurretBaseLow.prototype.graphics = 0;

    window.PlanetaryTurretBaseLow = PlanetaryTurretBaseLow;
}(window));