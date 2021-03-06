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
        this._initGraphics(BasicEnemy.width, BasicEnemy.height,queue.getResult('enemy4'));
    };

    BasicEnemy.prototype._tick = function() {
        this.enemyTick();
    };

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
    };

    BasicEnemy.prototype.collision = function(object){
    };

    BasicEnemy.prototype.dropBomb = function() {
        var angleSpeeds = MDF.angleSpeeds(270);

        var bomb = new RandomAOEBomb(1,7,this.rotation, angleSpeeds.x, angleSpeeds.y, this.faction);
        bomb.x = this.x + this.width/2 + angleSpeeds.x;
        bomb.y = this.y + this.height/2 + angleSpeeds.y;

        Game.gameArea.addChild(bomb);
        this.playSound("enemy_shoot");
    };

   /** Global static vars */
    BasicEnemy.width = 99;
    BasicEnemy.height = 47;
     
    window.BasicEnemy = BasicEnemy;
}(window));