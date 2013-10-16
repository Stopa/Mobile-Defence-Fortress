(function(window) {
    function Enemy(x, y, width, height, swarm) {
        this.initialize(x, y, width, height, swarm);
    }
    Enemy.prototype = new Actor();
    Enemy.prototype.actorInit = Enemy.prototype.initialize;
    Enemy.prototype.actorTick = Enemy.prototype._tick;
    Enemy.prototype.actorDie = Enemy.prototype._die;
    Enemy.prototype.curDirection = 1;  //1 for right, -1 for left

    Enemy.prototype.initialize = function(x, y, width, height, swarm) {
        this.actorInit();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // this.regX = 0.5 * this.width;
        
        this.swarm = swarm;
        this.faction =  Game.factions.aliens;

        this._initGraphics();
    }
    Enemy.prototype._tick = function() {
        this.actorTick();
        if (!this.swarm) this.tickMovement(2,30); // HARDCODE: x-speed, y-speed
        MDF.updateDebugRect(this);
    }

    Enemy.prototype._initGraphics = function() {
        this.shipBitmap = new createjs.Bitmap('assets/images/enemy/enemy.png');
        this.addChild(this.shipBitmap);
        MDF.createDebugRect(this, "#FFFF00");
    }

    Enemy.prototype._die = function() {
        this.actorDie();
        //call death animation
        //call death sound
    }
    Enemy.prototype.tickMovement = function(xSpeed, ySpeed) {
        this.x += this.curDirection * xSpeed;
        if (
            this.x < 0 + this.regX || 
            this.x >= Game.canvasWidth - this.regX
        ){
            this.curDirection *=-1;
            if(this.y < Stage.canvas.clientHeight*0.7) {
                this.y += ySpeed;
            }
        }
    }

    Enemy.prototype.collision = function(object){
        if(this.swarm) this.swarm.removeShip(this);
        this.takesDamage(101); //HARDCODE
    }
    Enemy.prototype.dropBomb = function() {
        var ENEMY_BOMB_GRAPHICS = 'assets/images/enemy/enemy_bomb.png';

        var angleSpeeds = MDF.angleSpeeds(270);

        var bomb = new Projectile(ENEMY_BOMB_GRAPHICS, this.rotation, angleSpeeds.x, angleSpeeds.y, this.faction);

        bomb.x = this.parent.x + this.x + 35 + angleSpeeds.x; // 35 is bitmap width / 2
        bomb.y = this.parent.y + this.y + angleSpeeds.y;
        bomb.regX = this.parent.width* 0.5; //this is required because the swarm object also uses the same regX
        Stage.addChild(bomb);
    }

    window.Enemy = Enemy;
}(window))