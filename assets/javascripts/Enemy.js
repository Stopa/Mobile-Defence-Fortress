(function(window) {
    function Enemy(belongsToSwarm) { //position to start the enemy at, referenced during attack
        this.initialize(belongsToSwarm);
    }
    Enemy.prototype = new Actor();
    Enemy.prototype.actorInit = Enemy.prototype.initialize;
    Enemy.prototype.actorTick = Enemy.prototype._tick;
    Enemy.prototype.curDirection = 1;  //1 for right, -1 for left

    Enemy.prototype.initialize = function(belongsToSwarm) {
        this.actorInit();

        this.origX = this.x;
        this.origY = this.y;
        this.belongsToSwarm = belongsToSwarm;
        this._initGraphics();
        
        //this.x=x;
        //this.y=y;
    }
    Enemy.prototype._tick = function() {
        this.actorTick();
        if (! this.belongsToSwarm) {
            this.tickMovement();
        }

    }

    Enemy.prototype._initGraphics = function() {

        this.shipBitmap = new createjs.Bitmap('assets/images/enemy/enemy.png');
        this.addChild(this.shipBitmap);
    }


    Enemy.prototype.tickMovement = function() {

        

        this.x += this.curDirection * 1;
        if (Math.abs(this.origX + this.x) > 100 ) {
            //this.curAttackPos = 0;
            this.curDirection *= -1;
            this.y += 20;
        } 
        
        //!TODO - call movement / attack pattern method
    }






    window.Enemy = Enemy;
}(window));