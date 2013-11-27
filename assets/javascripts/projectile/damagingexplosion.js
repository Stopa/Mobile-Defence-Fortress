(function(window) {
    function DamagingExplosion(x,y,faction,damage,maxScale) {
        this.initialize(x,y,faction,damage,maxScale);
    }

    DamagingExplosion.prototype = new Explosion();
    DamagingExplosion.prototype.explosionInit = DamagingExplosion.prototype.initialize;
    DamagingExplosion.prototype.explosionTick = DamagingExplosion.prototype._tick;
    DamagingExplosion.prototype.initialize = function(x,y,faction,damage,maxScale) {
        this.explosionInit('assets/images/enemy/explosion.png',x,y,maxScale);
        this.baseDamage = damage || 100;
        this.faction = faction;
    };

    DamagingExplosion.prototype.collision = function(collisionTarget) {
        collisionTarget.takesDamage(this.baseDamage);
    };

    window.DamagingExplosion = DamagingExplosion;
}(window));