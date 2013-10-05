(function(window) {
    function Projectile(imagePath, rotation, xspeed, yspeed) {
        this.xspeed = xspeed*this.speed;
        this.yspeed = yspeed*this.speed;
        this.initialize(imagePath, rotation, xspeed, yspeed);
    }
    Projectile.prototype = new Destructible();
    Projectile.prototype.destructibleInit = Projectile.prototype.initialize;
    Projectile.prototype.destructibleTick = Projectile.prototype._tick;

    Projectile.prototype.initialize = function(imagePath, rotation, aoe) {
        this.destructibleInit();

        this.width = 30;// TEMP HARDCODE
        this.height = 30; // TEMP HARDCODE
        this.imagePath = imagePath;
        this.rotation = rotation*0.5;
        this.aoe = aoe;
        Game.colliders.push(this);

        this.graphics = this._initGraphics();
    };

    Projectile.prototype._tick = function() {
        this.destructibleTick();
        if(this.isOutOfParentBounds()) {
            this._die();
            Collision.removeFromArray(this, Game.colliders);
        } else if(this.hasCollided == 1) {
            this.animateExplosion(this.explosionGraphics);
        } else {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }
        MDF.updateDebugRect(this);
    };

    Projectile.prototype._initGraphics = function() {
        this.projectileGraphics = new createjs.Bitmap(this.imagePath);
        this.projectileGraphics.x = 0;
        this.projectileGraphics.y = 0;
        this.projectileGraphics.rotation = this.rotation;
        MDF.createDebugRect(this);
        this.addChild(this.projectileGraphics);
        return this.projectileGraphics;
    }

    Projectile.prototype._initExplosionGraphics = function () {
        this.explosionGraphics = new createjs.Bitmap('assets/images/enemy/explosion.png');
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

    Projectile.prototype.collision = function() {
        this.hasCollided = 1;
        explosionGraphics = this._initExplosionGraphics();
        this.graphics.visible = false;
    }

    Projectile.prototype.speed = 7;
    Projectile.prototype.hasCollided = 0;
    Projectile.prototype.graphics = 0;
    Projectile.prototype.explosionGraphics = 0;

    window.Projectile = Projectile;
}(window))