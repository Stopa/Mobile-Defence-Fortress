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
        if (Math.abs(this.origX + this.x) > 500 ) {
            //this.curAttackPos = 0;
            this.curDirection *= -1;
            this.y += 20;
        } 
        
        //!TODO - call movement / attack pattern method
    }

    Enemy.prototype.dropBomb = function() {
        var ENEMY_BOMB_GRAPHICS = 'assets/images/enemy/enemy_bomb.png';

        var angleSpeeds = MDF.angleSpeeds(270);

        var bomb = new Projectile(ENEMY_BOMB_GRAPHICS, this.rotation, angleSpeeds.x, angleSpeeds.y);

        bomb.x = this.parent.x + this.x + 35 + angleSpeeds.x; // 35 is bitmap width / 2
        bomb.y = this.parent.y + this.y + angleSpeeds.y;

        Stage.addChild(bomb);
    }

    window.Enemy = Enemy;
}(window));