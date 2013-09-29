(function(window) {
    function Enemy(belongsToSwarm, width, height) { //position to start the enemy at, referenced during attack
        this.initialize(belongsToSwarm, width, height);
    }
    Enemy.prototype = new Actor();
    Enemy.prototype.actorInit = Enemy.prototype.initialize;
    Enemy.prototype.actorTick = Enemy.prototype._tick;
    Enemy.prototype.actorDie = Enemy.prototype._die;
    Enemy.prototype.curDirection = 1;  //1 for right, -1 for left

    Enemy.prototype.initialize = function(belongsToSwarm, width, height) {
        this.actorInit();


        this.width = width;
        this.height = height;
        
        this.belongsToSwarm = belongsToSwarm;

        this._initGraphics();
        this.origX = this.x;
        this.origY = this.y;
        
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

    Enemy.prototype._die = function() {
        this.actorDie();
        //call death animation
        //call death sound
    }


    Enemy.prototype.tickMovement = function() {

        this.x += this.curDirection * 1;
        if (Math.abs(this.origX + this.x) > 500 ) {
            //this.curAttackPos = 0;
            this.curDirection *= -1;
            this.y += 20;
        } 
        
    }

    Enemy.prototype.dropBomb = function() {
        var ENEMY_BOMB_GRAPHICS = 'assets/images/enemy/enemy_bomb.png';

        var angleSpeeds = MDF.angleSpeeds(270);

        var bomb = new Projectile(ENEMY_BOMB_GRAPHICS, this.rotation, angleSpeeds.x, angleSpeeds.y);

        bomb.x = this.parent.x + this.x + 35 + angleSpeeds.x; // 35 is bitmap width / 2
        bomb.y = this.parent.y + this.y + angleSpeeds.y;
        bomb.regX = this.parent.width* 0.5; //this is required because the swarm object also uses the same regX
        Stage.addChild(bomb);
    }

    window.Enemy = Enemy;
}(window))
