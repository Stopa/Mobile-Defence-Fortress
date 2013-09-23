(function(window) {
    function Projectile(xspeed, yspeed) {
        this.xspeed = xspeed*this.speed;
        this.yspeed = yspeed*this.speed;
        this.initialize(xspeed, yspeed);
    }
    Projectile.prototype = new Destructible();
    Projectile.prototype.destructibleInit = Projectile.prototype.initialize;
    Projectile.prototype.destructibleTick = Projectile.prototype._tick;
    Projectile.prototype.initialize = function() {
        this.destructibleInit();

        this.ball = new createjs.Shape();
        this.ball.graphics.beginFill('blue').drawCircle(0,0,5);
        this.ball.graphics.x = 0;
        this.ball.graphics.y = 0;
        this.addChild(this.ball);
    };
    Projectile.prototype._tick = function() {
        this.destructibleTick();
        this.x += this.xspeed;
        this.y += this.yspeed;
    };

    Projectile.prototype.speed = 5;

    window.Projectile = Projectile;
}(window))