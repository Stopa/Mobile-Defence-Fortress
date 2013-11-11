(function(window) {
    function Enemy(x, y, swarm) {
        this.initialize(x, y, swarm);
    }
    Enemy.prototype = new Actor();
    Enemy.prototype.actorInit = Enemy.prototype.initialize;
    Enemy.prototype.actorTick = Enemy.prototype._tick;
    Enemy.prototype.actorDie = Enemy.prototype._die;
    Enemy.prototype.curDirection = 1;  //1 for right, -1 for left

    Enemy.prototype.initialize = function(x, y, swarm) {
        this.actorInit();

        this.x = x;
        this.y = y;
        
        this.swarm = swarm;
        this.faction =  Game.factions.aliens;

        this._initGraphics();
    }
    Enemy.prototype._tick = function() {
        MDF.updateDebugRect(this);
        this.actorTick();
        if (!this.swarm) this.tickMovement(2,30); // HARDCODE: x-speed, y-speed
    }

    Enemy.prototype._initGraphics = function() {
        this.width = 99;
        this.height = 47;
        this.shipBitmap = new createjs.Bitmap('assets/images/enemy/enemy4.png');
        this.addChild(this.shipBitmap);
    }

    Enemy.prototype._die = function() {
        if (this.swarm) this.swarm.removeShip(this);
        this.actorDie();
        //call death animation
        //call death sound
    }
    Enemy.prototype.tickMovement = function(xSpeed, ySpeed) {
        this.x += this.curDirection * xSpeed;
        if (
            this.x < 0 + this.regX || 
            this.x >= Game.transformedSize.x - this.regX
        ){
            this.curDirection *=-1;
            if(this.y < Game.transformedSize.y*0.6) {
                this.y += ySpeed;
            }
        }
    }

    Enemy.prototype.collision = function(object){
        this.takesDamage(101); //HARDCODE
    }
    Enemy.prototype.dropBomb = function() {
        var ENEMY_BOMB_GRAPHICS = 'assets/images/enemy/enemy_bombv2.png';

        var angleSpeeds = MDF.angleSpeeds(270);

        var bomb = new Projectile(ENEMY_BOMB_GRAPHICS, this.rotation, angleSpeeds.x, angleSpeeds.y, this.faction, 7, 12);

        bomb.x = this.x + 35 + angleSpeeds.x; // 35 is bitmap width / 2
        bomb.y = this.y + angleSpeeds.y;
        Game.gameArea.addChild(bomb);
    }

    window.Enemy = Enemy;
}(window))