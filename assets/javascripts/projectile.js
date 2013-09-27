(function(window) {
    function Projectile(imagePath, rotation, xspeed, yspeed) {
        this.xspeed = xspeed*this.speed;
        this.yspeed = yspeed*this.speed;
        this.initialize(imagePath, rotation, xspeed, yspeed);
    }
    Projectile.prototype = new Destructible();
    Projectile.prototype.destructibleInit = Projectile.prototype.initialize;
    Projectile.prototype.destructibleTick = Projectile.prototype._tick;
    Projectile.prototype.initialize = function(imagePath, rotation) {
        this.destructibleInit();

        this.imagePath = imagePath;
        this.rotation = rotation*0.5;

        this._initGraphics();
    };

    Projectile.prototype._tick = function() {
        this.destructibleTick();
        if(this.isOutOfParentBounds()) {
            this._die();
        } else {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }
    };

    Projectile.prototype._initGraphics = function() {
        this.projectileGraphics = new createjs.Bitmap(this.imagePath);
        this.projectileGraphics.x = 0;
        this.projectileGraphics.y = 0;
        this.projectileGraphics.rotation = this.rotation;

        this.addChild(this.projectileGraphics);
    }

    Projectile.prototype.speed = 7;

    window.Projectile = Projectile;
}(window))