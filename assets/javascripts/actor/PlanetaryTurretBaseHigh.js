(function(window) {
    function PlanetaryTurretBaseHigh(x, y) {
        this.initialize(x, y);
    }
    PlanetaryTurretBaseHigh.prototype = new Actor();
    PlanetaryTurretBaseHigh.prototype.actorInit = PlanetaryTurretBaseHigh.prototype.initialize;
    PlanetaryTurretBaseHigh.prototype.actorTick = PlanetaryTurretBaseHigh.prototype._tick;

    PlanetaryTurretBaseHigh.prototype.initialize = function(x, y) {
        this.actorInit();

        this.x = x;
        this.y = y;
        
        this.faction =  Game.factions.humans;

        this.pointDefence = new PointDefence();
        this.pointDefence.x = 31;
        this.pointDefence.y = 3; // HARDCODE
        this.pointDefence.scaleX = 0.7;
        this.pointDefence.scaleY = 0.7;
        this.addChild(this.pointDefence);
        
        this.graphics = this._initGraphics();

        this.baseHitpoints = 14;
    };

    PlanetaryTurretBaseHigh.prototype._tick = function() {
        this.actorTick();
    };

    PlanetaryTurretBaseHigh.prototype._initGraphics = function() {
        this.width = 65;
        this.height = 43;
        this.PlanetaryTurretBaseHighBitmap = new createjs.Bitmap(
            'assets/images/turret/planetary_turret_base_high.png');
        this.addChild(this.PlanetaryTurretBaseHighBitmap);
        return this.PlanetaryTurretBaseHighBitmap;
    };

    PlanetaryTurretBaseHigh.prototype.getHitpoints = function() {
        /**
        *   Temporarily returns base hitpoints, in the future
        *   should return actual hitpoints.
        */
        return this.baseHitpoints;
    };

    PlanetaryTurretBaseHigh.prototype.collision = function(object) {
        if (this.getHitpoints() <= 0) {
            this._die();
        }
    };

    PlanetaryTurretBaseHigh.prototype.graphics = 0;

    window.PlanetaryTurretBaseHigh = PlanetaryTurretBaseHigh;
}(window));