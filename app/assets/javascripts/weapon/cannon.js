(function(window) {
    function Cannon() {
        this.initialize();
    }
    Cannon.prototype = new Weapon();
    Cannon.prototype.weaponInit = Cannon.prototype.initialize;
    Cannon.prototype.initialize = function() {
        this.weaponInit('assets/images/player_ship/cannon.png', 36, 40);
    };

    Cannon.prototype._nextShotLeft = false; // whether the next shot will be fired from the left or right cannon
    Cannon.prototype.shoot = function() {
        if(this.cooldown <= 0) {
            var CANNON_BULLET_GRAPHICS = 'assets/images/player_ship/bullet.png';

            var realAngle = (this.rotation-90)*-1,
                angleSpeeds = MDF.angleSpeeds(realAngle),
                weaponAbsX = this.parent.x+this.x,
                weaponAbsY = this.parent.y+this.y
                barrelPositionSpeeds = MDF.angleSpeeds(realAngle-90);


            var bullet = new Projectile(CANNON_BULLET_GRAPHICS,
                this.rotation, angleSpeeds.x, angleSpeeds.y,
                this.parent.faction);
            /*
            * Bullet starting point is offset by the weapon length along the weapon rotation axis
            * and offset by 10 pixels by the perpendicular angle depending on which barrel we are currently using
            */
            bullet.x = weaponAbsX+angleSpeeds.x*(this.height)+barrelPositionSpeeds.x*10*(this._nextShotLeft?-1:1);
            bullet.y = weaponAbsY+angleSpeeds.y*(this.height)+barrelPositionSpeeds.y*10*(this._nextShotLeft?-1:1);
            Stage.addChild(bullet);

            this._nextShotLeft = !this._nextShotLeft;

            this.cooldown = this.attackSpeed;
        }
    }

    Cannon.prototype.attackSpeed = 14;

    window.Cannon = Cannon;
}(window))