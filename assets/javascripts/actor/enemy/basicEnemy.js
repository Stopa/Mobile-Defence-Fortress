(function(window) {
    function BasicEnemy(x, y, swarm) {
        this.initialize(x, y, swarm);
    }
    BasicEnemy.prototype = new Enemy();
    BasicEnemy.prototype.enemyInit = BasicEnemy.prototype.initialize;
    BasicEnemy.prototype.enemyTick = BasicEnemy.prototype._tick;

    BasicEnemy.prototype.initialize = function(x, y, swarm) {
        this.enemyInit(x,y,swarm);
        this.xSpeed = 2;
        this.ySpeed = 30;
        this.curDirection = 1; //1 for right, -1 for left
        this._initGraphics(BasicEnemy.width, BasicEnemy.height,'assets/images/enemy/enemy4.png');
    }
    BasicEnemy.prototype._tick = function() {
        this.enemyTick();
    }

    BasicEnemy.prototype.tickMovement = function() {
        this.x += this.curDirection * this.xSpeed;
        if (
            this.x < 0 + this.regX ||
            this.x >= Game.transformedSize.x - this.regX
        ){
            this.curDirection *=-1;
            if(this.y < Game.transformedSize.y*0.6) {
                this.y += this.ySpeed;
            }
        }
    }

    BasicEnemy.prototype.collision = function(object){
        this.takesDamage(101); //HARDCODE
    }
    BasicEnemy.prototype.dropBomb = function() {
        var ENEMY_BOMB_GRAPHICS = 'assets/images/enemy/enemy_bombv2.png';

        var angleSpeeds = MDF.angleSpeeds(270);

        var bomb = new Projectile(ENEMY_BOMB_GRAPHICS, this.rotation, angleSpeeds.x, angleSpeeds.y, this.faction, 7, 12);
        bomb.baseDamage = 10;

        bomb.x = this.x + 35 + angleSpeeds.x; // 35 is bitmap width / 2
        bomb.y = this.y + angleSpeeds.y;
        Game.gameArea.addChild(bomb);
    }

   /** Global static vars */
    BasicEnemy.width = 99;
    BasicEnemy.height = 47;
     
    window.BasicEnemy = BasicEnemy;
}(window))