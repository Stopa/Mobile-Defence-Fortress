(function(window) {
    function RandomAOEBomb(minDamage, maxDamage, rotation, xspeed, yspeed, faction) {
        this.initialize(minDamage, maxDamage, rotation, xspeed, yspeed, faction);
    }
    RandomAOEBomb.prototype = new Projectile();
    RandomAOEBomb.prototype.projectileInit = RandomAOEBomb.prototype.initialize;

    RandomAOEBomb.prototype.initialize = function(minDamage, maxDamage, rotation, xspeed, yspeed, faction) {
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;

        this.projectileInit(queue.getResult('enemyBombV2'), rotation, xspeed, yspeed, faction, 7, 12);
    };

    RandomAOEBomb.prototype.collision = function(object) {
        this.hasCollided = 1;
        this.graphics.visible = false;
        var explosion = new DamagingExplosion(this.x,this.y,this.faction,this.damage(),0.2);
        Game.gameArea.addChild(explosion);
        this._die();
    };

    RandomAOEBomb.prototype.damage = function() {
        return Math.floor(Math.random()*this.maxDamage+this.minDamage);
    };

    window.RandomAOEBomb = RandomAOEBomb;
}(window));