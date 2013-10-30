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
            this.animateExplosion(this.explosionGraphics);
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

    Projectile.prototype._initExplosionGraphics = function () {
        this.explosionGraphics = new createjs.Bitmap('images/enemy/explosion.png');
        this.explosionGraphics.x = 0;
        this.explosionGraphics.y = 0;
        this.explosionGraphics.scaleX = 0;
        this.explosionGraphics.scaleY = 0;
        this.addChild(this.explosionGraphics);
        
        var _this = this;
        setTimeout(function() {
            _this._die();
        }, 400);

        return this.explosionGraphics;
    }

    Projectile.prototype.animateExplosion = function(explosionGraphics) {
        if (explosionGraphics.scaleX < 2) {
            explosionGraphics.x -= 4.15;
            explosionGraphics.y -= 4.15;
            explosionGraphics.scaleX += 0.05;
            explosionGraphics.scaleY += 0.05;            
        }
    }

    Projectile.prototype.collision = function(object) {
        this.hasCollided = 1;
        this.explosionGraphics = this._initExplosionGraphics();
        this.graphics.visible = false;
    }

    Projectile.prototype.speed = 5;
    // Boolean
    Projectile.prototype.hasCollided = 0;
    // _initGraphics()
    Projectile.prototype.graphics = 0;
    // _initExplosionGraphics()
    Projectile.prototype.explosionGraphics = 0;

    window.Projectile = Projectile;
}(window))