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
            if(this.exploded) {
                if(this.explosionTimeToLive) {
                    this.explosionTimeToLive--;
                } else {
                    this._die();
                }
            } else {
                this.explode();
            }
        } else {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }
    };

    Missile.prototype.initGraphics = function() {
        this.graphics = new createjs.Bitmap('images/player_ship/bullet.png');
        this.graphics.x = 0;
        this.graphics.y = 0;
        this.addChild(this.graphics);
    };

    Missile.prototype.explode = function() {
        this.removeChild(this.graphics);
        this.exploded = true;
        
        this.explosionGraphics = new createjs.Bitmap('images/enemy/explosion.png');
        this.explosionGraphics.x = -83;
        this.explosionGraphics.y = -83;
        this.addChild(this.explosionGraphics);
    };

    Missile.prototype.hasReachedTarget = function() {
        return (this.xspeed > 0 && this.x <= this.xtarget && this.x+this.xspeed > this.xtarget ||
            this.xspeed < 0 && this.x >= this.xtarget && this.x+this.xspeed < this.xtarget)
            &&
            (this.yspeed > 0 && this.y <= this.ytarget && this.y+this.yspeed > this.ytarget ||
            this.yspeed < 0 && this.y >= this.ytarget && this.y+this.yspeed < this.ytarget);
    };

    Missile.prototype._die = function() {
        this.parent.removeChild(this);
    };

    Missile.prototype.speed = 2;
    Missile.prototype.missile = Missile;
    Missile.prototype.exploded = false;
    Missile.prototype.explosionTimeToLive = 100;

    window.Missile = Missile;
}(window))