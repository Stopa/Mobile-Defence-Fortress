(function(window) {
    function Weapon(imagePath, width, height) { // also probably projectile, damage and other attributes
        this.initialize(imagePath, width, height);
    }
    Weapon.prototype = new createjs.Container();
    Weapon.prototype.containerInit = Weapon.prototype.initialize;
    Weapon.prototype.containerTick = Weapon.prototype._tick;
    Weapon.prototype.initialize = function(imagePath, width, height) {
        this.containerInit();

        this.imagePath = imagePath;
        this.width = width;
        this.height = height;

        this._initGraphics();
    };
    Weapon.prototype._tick = function() {
        this.containerTick();
        if(this.cooldown > 0) {
            this.cooldown--;
        }
    };

    Weapon.prototype.rotateToCursor = function() {
        var weaponAbsX = this.parent.x+this.x,
            weaponAbsY = this.parent.y+this.y,
            deltaX = Stage.mouseX-weaponAbsX,
            deltaY = Stage.mouseY-weaponAbsY,
            degrees = (Math.atan2(deltaY, deltaX)*180/Math.PI)+90;

        if(degrees < 60 && degrees > -60) {
            this.rotation = degrees;
        }
    };
    Weapon.prototype._initGraphics = function() {
        this.weaponGraphics = new createjs.Bitmap(this.imagePath);
        this.weaponGraphics.x = -1*this.width*0.5;
        this.addChild(this.weaponGraphics);

        this.regX = 0;
        this.regY = this.height-10;
    };
    Weapon.prototype.shoot = function() {
        if(this.cooldown <= 0) {
            var realAngle = (this.rotation-90)*-1,
                angleSpeeds = MDF.angleSpeeds(realAngle),
                weaponAbsX = this.parent.x+this.x,
                weaponAbsY = this.parent.y+this.y;

            var bullet = new Projectile(angleSpeeds.x, angleSpeeds.y);
            /*
            * Bullet starting point is offset by the weapon length along the weapon rotation axis
            */
            bullet.x = weaponAbsX+angleSpeeds.x*(this.height);
            bullet.y = weaponAbsY+angleSpeeds.y*(this.height);
            Stage.addChild(bullet);

            this.cooldown = this.attackSpeed;
        }
    };

    // Default attackSpeed
    Weapon.prototype.attackSpeed = 100;
    // If cooldown <= 0 then fire new projectile.
    Weapon.prototype.cooldown = 0;

    window.Weapon = Weapon;
}(window))