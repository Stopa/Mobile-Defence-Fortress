(function(window) {
    function Projectile(xspeed, yspeed) {
        this.xspeed = xspeed*this.speed;
        this.yspeed = yspeed*this.speed;
        this.initialize();
    }
    Projectile.prototype = new createjs.Container();
    Projectile.prototype.s_init = Projectile.prototype.initialize;
    Projectile.prototype.s_tick = Projectile.prototype._tick;
    Projectile.prototype.initialize = function() {
        this.s_init();

        this.ball = new createjs.Shape();
        this.ball.graphics.beginFill('blue').drawCircle(0,0,5);
        this.ball.graphics.x = 0;
        this.ball.graphics.y = 0;
        this.addChild(this.ball);
    };
    Projectile.prototype._tick = function() {
        this.s_tick();
        this.x += this.xspeed;
        this.y += this.yspeed;
    };

    Projectile.prototype.speed = 5;

    window.Projectile = Projectile;
}(window))