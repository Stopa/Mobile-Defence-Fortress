(function(window) {
    function Missile(rotation, xspeed, yspeed, xtarget, ytarget, faction) {
        this.initialize(rotation, xspeed, yspeed, xtarget, ytarget, faction);
    }
    Missile.prototype = new createjs.Container();
    Missile.prototype.containerInit = Missile.prototype.initialize;
    Missile.prototype.containerTick = Missile.prototype._tick;
    Missile.prototype.initialize = function(rotation, xspeed, yspeed, xtarget, ytarget, faction) {
        this.containerInit();
        this.rotation = rotation;
        this.xspeed = xspeed*this.speed;
        this.yspeed = yspeed*this.speed;
        this.xtarget = xtarget;
        this.ytarget = ytarget;
        this.faction = faction;
        this.initGraphics();
    };

    Missile.prototype._tick = function() {
        this.containerTick();
        if(this.hasReachedTarget()) {
            this.explode();
        } else {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }
    };

    Missile.prototype.initGraphics = function() {
        this.graphics = new createjs.Bitmap('assets/images/player_ship/bullet.png');
        this.graphics.x = 0;
        this.graphics.y = 0;
        this.addChild(this.graphics);
    };

    Missile.prototype.explode = function() {
        this._die();
        Game.gameArea.addChild(new DamagingExplosion(this.x,this.y,this.faction));
    };

    Missile.prototype.hasReachedTarget = function() {
        return Math.abs(this.xtarget-this.x) < Math.abs(this.xspeed) && Math.abs(this.ytarget-this.y) < Math.abs(this.yspeed);
    };

    Missile.prototype._die = function() {
        this.parent.removeChild(this);
    };

    Missile.prototype.speed = 2;
    Missile.prototype.missile = Missile;
    Missile.prototype.explosionTimeToLive = 100;

    window.Missile = Missile;
}(window));