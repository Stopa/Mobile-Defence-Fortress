(function(window) {
    function Flyship(x, y, swarm) {
        this.initialize(x, y, swarm);
    }
    Flyship.prototype = new Enemy();
    Flyship.prototype.enemyInit = Flyship.prototype.initialize;
    Flyship.prototype.enemyTick = Flyship.prototype._tick;
    Flyship.prototype.initialize = function(x, y, swarm) {
        this.enemyInit(x,y,swarm);
    }

    Flyship.prototype._tick = function() {
        this.enemyTick();
    }

    Flyship.prototype._initGraphics = function() {
        this.shipBitmap = new createjs.Bitmap('assets/images/enemy/enemy1.png');
        this.width = 48;
        this.height = 45;
        this.addChild(this.shipBitmap);
    }
 

    window.Flyship = Flyship;
}(window))