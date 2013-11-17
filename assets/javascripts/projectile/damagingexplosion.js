(function(window) {
    function DamagingExplosion(x,y) {
        this.initialize(x,y);
    }

    DamagingExplosion.prototype = new Explosion();
    DamagingExplosion.prototype.explosionInit = DamagingExplosion.prototype.initialize;
    DamagingExplosion.prototype.explosionTick = DamagingExplosion.prototype._tick;
    DamagingExplosion.prototype.initialize = function(x,y) {
        this.explosionInit('assets/images/enemy/explosion.png',x,y);
    };

    DamagingExplosion.prototype.collision = function(collisionTarget) {
        collisionTarget.takesDamage(this.baseDamage);
    };

    DamagingExplosion.prototype.faction = Game.factions.humans;

    DamagingExplosion.prototype.baseDamage = 100;

    window.DamagingExplosion = DamagingExplosion;
}(window));