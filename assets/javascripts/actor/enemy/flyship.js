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

        this._initGraphics(Flyship.width,Flyship.height,'assets/images/enemy/enemy1.png');
    }

    Flyship.prototype._tick = function() {
        this.enemyTick();
    }
    Flyship.prototype.collision = function(object){
        this.takesDamage(51); //HARDCODE
    }


    /** Global static vars */
    Flyship.width = 45;
    Flyship.height = 48;
    
    window.Flyship = Flyship;
}(window))