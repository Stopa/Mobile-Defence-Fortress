(function(window) {
    function Enemy(x, y, swarm) {
        this.initialize(x, y, swarm);
    }
    Enemy.prototype = new Actor();
    Enemy.prototype.actorInit = Enemy.prototype.initialize;
    Enemy.prototype.actorTick = Enemy.prototype._tick;
    Enemy.prototype.actorDie = Enemy.prototype._die;

    Enemy.prototype.initialize = function(x, y, swarm) {
        this.actorInit();

        this.x = x;
        this.y = y;
        
        this.swarm = swarm;
        this.faction =  Game.factions.aliens;
    };
    Enemy.prototype._tick = function() {
        MDF.updateDebugRect(this);
        this.actorTick();
        if (this.baseHitpoints <= 0) return;


        if (!this.swarm) this.tickMovement(2,30); // HARDCODE: x-speed, y-speed

        if(this.swarm){ 
            if ((this.swarm.state == swarmCommon.states.HIGHORBIT ||
                this.swarm.state == swarmCommon.states.MIDORBIT )&&
                    this.swarm.currentTarget &&
                    MDF.xCenterDistance(this, this.swarm.currentTarget) < this.swarm.currentTarget.width/2){

                if (Math.floor(Math.random()*1000) % 50 === 0) this.dropBomb();
            }
        }
    };

    Enemy.prototype._initGraphics = function(width,height,bitmapPath) {
        this.width = width;
        this.height = height;
        this.shipBitmap = new createjs.Bitmap(bitmapPath);
        this.addChild(this.shipBitmap);
    };

    Enemy.prototype._die = function() {
        if (this.swarm) this.swarm.removeShip(this);
        this.actorDie();
        //call death animation
        //call death sound
    };
    Enemy.prototype.tickMovement = function() {
    };

    Enemy.prototype.collision = function(object){
    };

    window.Enemy = Enemy;
}(window));