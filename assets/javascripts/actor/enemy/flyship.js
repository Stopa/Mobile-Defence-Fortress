(function(window) {
    function Flyship(x, y, swarm) {
        var height = 5;
        this.initialize(x, y, swarm);
    }
    Flyship.prototype = new Enemy();
    Flyship.prototype.enemyInit = Flyship.prototype.initialize;
    Flyship.prototype.enemyTick = Flyship.prototype._tick;
    Flyship.prototype.initialize = function(x, y, swarm) {
        this.enemyInit(x,y,swarm);

        this._initGraphics(Flyship.width,Flyship.height,queue.getResult('enemy1'));
    }

    Flyship.prototype._tick = function() {
        this.enemyTick();
    };

    Flyship.prototype.collision = function(object){
    };

    /** The following function is currently identical to the one in basicEnemy.js 
    !TODO describe a separate attack/shot/bomb behaviour function here */
    Flyship.prototype.dropBomb = function(){

        var angleSpeeds = MDF.angleSpeeds(270);

        var bomb = new RandomAOEBomb(1,7,this.rotation, angleSpeeds.x, angleSpeeds.y, this.faction);

        bomb.baseDamage = 10;

        bomb.x = this.x + 35 + angleSpeeds.x; // 35 is bitmap width / 2
        bomb.y = this.y + angleSpeeds.y;
        Game.gameArea.addChild(bomb);
    };


    /** Global static vars */
    Flyship.width = 45;
    Flyship.height = 48;
    
    window.Flyship = Flyship;
}(window));
