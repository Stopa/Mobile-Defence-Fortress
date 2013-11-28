(function(window) {
    function Facility(x, y) {
        this.initialize(x, y);
    }
    Facility.prototype = new Actor();
    Facility.prototype.actorInit = Facility.prototype.initialize;
    Facility.prototype.actorTick = Facility.prototype._tick;

    Facility.prototype.initialize = function(x, y) {
        this.actorInit();

        this.x = x;
        this.y = y;
        
        this.faction =  Game.factions.humans;
        
        this.graphics = this._initGraphics();

        this.baseHitpoints = 14;
    };

    Facility.prototype._tick = function() {
        this.actorTick();
    };

    Facility.prototype._initGraphics = function() {
        this.width = 65*1.5;
        this.height = 43*1.5;
        this.facilityBitmap = new createjs.Bitmap(queue.getResult('building'));
        this.facilityBitmap.scaleX = 1.5;
        this.facilityBitmap.scaleY = 1.5;
        this.addChild(this.facilityBitmap);
        return this.facilityBitmap;
    };

    Facility.prototype._initDamagedGraphics = function() {
        this.width = 65*1.5;
        this.height = 43*1.5;
        this.facilityBitmap = new createjs.Bitmap(queue.getResult('buildingDamaged'));
        this.facilityBitmap.scaleX = 1.5;
        this.facilityBitmap.scaleY = 1.5;
        this.addChild(this.facilityBitmap);
        return this.facilityBitmap;
    };

    Facility.prototype.getHitpoints = function() {
        /**
        *   Temporarily returns base hitpoints, in the future
        *   should return actual hitpoints.
        */
        return this.baseHitpoints;
    };

    Facility.prototype.collision = function(object) {
        if (this.getHitpoints() <= 7) {
            this.removeChild(this.pointDefence);
            this.graphics.visible = false;
            this.graphics = this._initDamagedGraphics();
        }
    };

    Facility.prototype.graphics = 0;

    window.Facility = Facility;
}(window));