(function(window) {
    function DoubleBarreledGun() {
        this.initialize();
    }
    DoubleBarreledGun.prototype = new Weapon();
    DoubleBarreledGun.prototype.weaponInit = DoubleBarreledGun.prototype.initialize;
    DoubleBarreledGun.prototype.initialize = function() {
        this.weaponInit('assets/images/player_ship/cannon.png', 41, 45);
    };

    DoubleBarreledGun.prototype._nextShotLeft = false; // whether the next shot will be fired from the left or right cannon
    DoubleBarreledGun.prototype.shoot = function() {
        var realAngle = (this.rotation-90)*-1,
            angleSpeeds = MDF.angleSpeeds(realAngle),
            weaponAbsX = this.parent.x+this.x,
            weaponAbsY = this.parent.y+this.y
            barrelPositionSpeeds = MDF.angleSpeeds(realAngle-90);

        var bullet = new Projectile(angleSpeeds.x, angleSpeeds.y);
        /*
        * Bullet starting point is offset by the weapon length along the weapon rotation axis
        * and offset by 10 pixels by the perpendicular angle depending on which barrel we are currently using
        */
        bullet.x = weaponAbsX+angleSpeeds.x*(this.height)+barrelPositionSpeeds.x*10*(this._nextShotLeft?-1:1);
        bullet.y = weaponAbsY+angleSpeeds.y*(this.height)+barrelPositionSpeeds.y*10*(this._nextShotLeft?-1:1);
        Stage.addChild(bullet);

        this._nextShotLeft = !this._nextShotLeft;
    }

    window.DoubleBarreledGun = DoubleBarreledGun;
}(window))