(function(window) {
    function RandomDamageProjectile(minDamage, maxDamage, rotation, xspeed, yspeed, faction) {
        this.initialize(minDamage, maxDamage, rotation, xspeed, yspeed, faction);
    }
    RandomDamageProjectile.prototype = new Projectile();
    RandomDamageProjectile.prototype.projectileInit = RandomDamageProjectile.prototype.initialize;

    RandomDamageProjectile.prototype.initialize = function(minDamage, maxDamage, rotation, xspeed, yspeed, faction) {
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;

        this.projectileInit(queue.getResult('enemyBombV2'), rotation, xspeed, yspeed, faction, 7, 12);
    };

    RandomDamageProjectile.prototype.collision = function(object) {
        this.hasCollided = 1;
        this.graphics.visible = false;
        var explosion = new Explosion(queue.getResult('explosion'),this.x,this.y);
        Game.gameArea.addChild(explosion);
        this._die();

        if(object.takesDamage && !Game.godmode) {
            object.takesDamage(this.damage());
        }
    };

    RandomDamageProjectile.prototype.damage = function() {
        return Math.floor(Math.random()*this.maxDamage+this.minDamage);
    };

    window.RandomDamageProjectile = RandomDamageProjectile;
}(window));