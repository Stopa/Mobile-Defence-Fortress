Projectile = _.extend({},Destructible, {
    speed: 0.01,
    damage: 10,
    destinationX: 0,
    destinationY: 0,
    initGraphics: function() {
        this.graphics = new createjs.Shape();
        this.graphics.graphics.beginFill('blue').drawCircle(0,0,5);
        // This code is shit, refactor Projectile to extend from displayobject or shape or something so that we can natively use magic like this without hacks
        this.graphics.xspeed = this.xspeed;
        this.graphics.yspeed = this.yspeed;
        this.graphics.update = function() {
            this.x += this.xspeed;
            this.y += this.yspeed;
            if(this.x < 0 || this.y < 0 || this.x > Stage.canvas.width || this.y > Stage.canvas.height) {
                Stage.removeChild(this);
            }
        }
        Stage.addChild(this.graphics);
    },
    init: function(x, y, destinationX, destinationY) {
        this.destinationX = destinationX;
        this.destinationY = destinationY;
        this.xspeed = (destinationX-x)*this.speed;
        this.yspeed = (destinationY-y)*this.speed;

        this.initGraphics();
        this.graphics.x = x;
        this.graphics.y = y;

        return this;
    }
})