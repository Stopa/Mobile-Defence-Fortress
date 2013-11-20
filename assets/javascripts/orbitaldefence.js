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
        this.faction = Game.factions.humans;

        this._initGraphics();
    };

    OrbitalDefence.prototype._tick = function() {
        this.destructibleTick();
    };

    OrbitalDefence.prototype._initGraphics = function() {
        this.orbitalDefenceBitmap = new createjs.Bitmap('assets/images/orbital_defence/orbital_defence.png');

        this.orbitalDefenceBitmap.scaleX = 1/2;
        this.orbitalDefenceBitmap.scaleY = 1/4;

        this.width= this.orbitalDefenceBitmap.scaleX * 256;  //hardcode
        this.height=this.orbitalDefenceBitmap.scaleY * 256;

        this.addChild(this.orbitalDefenceBitmap);
    };

    OrbitalDefence.prototype.collision = function(object){
    };

    OrbitalDefence.prototype.baseHitpoints = 30;

    window.OrbitalDefence = OrbitalDefence;
}(window));