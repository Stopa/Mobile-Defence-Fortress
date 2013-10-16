(function(window) {
    function OrbitalDefence(width, height, x, y) {
        this.initialize(width, height, x, y);
    }
    OrbitalDefence.prototype = new Destructible();
    OrbitalDefence.prototype.actorInit = OrbitalDefence.prototype.initialize;
    OrbitalDefence.prototype.actorTick = OrbitalDefence.prototype._tick;
    OrbitalDefence.prototype.actorDie = OrbitalDefence.prototype._die;

    OrbitalDefence.prototype.initialize = function(width, height, x, y) {
        this.actorInit();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this._initGraphics();
    }
    OrbitalDefence.prototype._tick = function() {
        this.actorTick();
        //MDF.updateDebugRect(this);
    }

    OrbitalDefence.prototype._initGraphics = function() {
        this.shipBitmap = new createjs.Bitmap('assets/images/orbital_defence/orbital_defence_placeholder.png');
        this.addChild(this.shipBitmap);
        //MDF.createDebugRect(this, "#FFFF00");
    }

    OrbitalDefence.prototype._die = function() {
        //call death animation
        //call death sound
    }

    OrbitalDefence.prototype.collision = function(object){
        this.takesDamage(20); //HARDCODE
    }

    window.OrbitalDefence = OrbitalDefence;
}(window))