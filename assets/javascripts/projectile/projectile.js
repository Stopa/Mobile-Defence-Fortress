(function(window) {
    function Projectile(imagePath, rotation, xspeed, yspeed, faction, width, height) {
        this.xspeed = xspeed*this.speed;
        this.yspeed = yspeed*this.speed;
        this.initialize(imagePath, rotation, xspeed, yspeed, faction, width, height);
    }
    Projectile.prototype = new Destructible();
    Projectile.prototype.destructibleInit = Projectile.prototype.initialize;
    Projectile.prototype.destructibleTick = Projectile.prototype._tick;

    Projectile.prototype.initialize = function(imagePath, rotation, xspeed, yspeed, faction, width, height) {
        this.destructibleInit();

        this.width = width;
        this.height = height;
        this.imagePath = imagePath;
        this.rotation = rotation;
        this.faction = faction;

        this.graphics = this._initGraphics();
    };

    Projectile.prototype._tick = function() {
        MDF.updateDebugRect(this);
        this.destructibleTick();
        if(this.isOutOfParentBounds()) {
            this._die();
        } else if(this.hasCollided == 1) {
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
        this.projectileGraphics.rotation = 0;
        this.addChild(this.projectileGraphics);
        return this.projectileGraphics;
    }

    Projectile.prototype.collision = function(object) {
        this.hasCollided = 1;
        this.graphics.visible = false;
        this.explosion = new Explosion('assets/images/enemy/explosion.png');
    }

    Projectile.prototype.speed = 5;
    // Boolean
    Projectile.prototype.hasCollided = 0;
    // _initGraphics()
    Projectile.prototype.graphics = 0;

    Projectile.prototype.explosion = 0;

    window.Projectile = Projectile;
}(window))