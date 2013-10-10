(function(window) {
    function Enemy(belongsToSwarm, width, height, x, y) {
        this.initialize(belongsToSwarm, width, height, x, y);
    }
    Enemy.prototype = new Actor();
    Enemy.prototype.actorInit = Enemy.prototype.initialize;
    Enemy.prototype.actorTick = Enemy.prototype._tick;
    Enemy.prototype.actorDie = Enemy.prototype._die;
    Enemy.prototype.curDirection = 1;  //1 for right, -1 for left

    Enemy.prototype.initialize = function(belongsToSwarm, width, height, x, y) {
        this.actorInit();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.belongsToSwarm = belongsToSwarm;
        this.faction =  Game.factions.aliens;

        this._initGraphics();
    }
    Enemy.prototype._tick = function() {
        this.actorTick();
        if (!this.belongsToSwarm) this.tickMovement(2,30); // HARDCODE: x-speed, y-speed
        MDF.updateDebugRect(this);
    }

    Enemy.prototype._initGraphics = function() {
        this.shipBitmap = new createjs.Bitmap('assets/images/enemy/enemy.png');
        this.addChild(this.shipBitmap);
        MDF.createDebugRect(this, "#FFFF00");
    }

    Enemy.prototype._die = function() {
        if(this.belongsToSwarm) this.parent.removeShip(this);
        Collision.removeFromArray(this, Game.colliders);
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
        this.baseHitpoints -= 101; //HARDCODE
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