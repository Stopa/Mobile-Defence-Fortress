(function(window) {
    function Swarm(x,y,rows, cols) {
        this.initialize(x,y,rows,cols);
    }
    Swarm.prototype = new createjs.DisplayObject();
    Swarm.prototype.displayObjectInit = Swarm.prototype.initialize;
    Swarm.prototype.displayObjectTick = Swarm.prototype._tick;

    Swarm.prototype.initialize = function(x,y) {
        this.displayObjectInit();

        this.x = x;
        this.y = y;

        this.width = 0;
        this.height = 0;

        this.curDirection = 1;

        this.totalShips = 0;
        this.shipsArray = [];
    };

    Swarm.prototype._tick = function() {
        this.displayObjectTick();
        this.tickMovement();
        MDF.updateDebugRect(this);
    };


    Swarm.prototype.removeShip = function(ship){
        MDF.removeFromArray(ship, this.shipsArray);
        this.totalShips--;
        if (this.totalShips === 0){
            this._die();
        }
    }

    Swarm.prototype.moveEachShip = function(xStepsize, yStepsize) {
        for (var i=0; i < this.shipsArray.length; i ++) {
            var ship = this.shipsArray[i];
            ship.x += this.curDirection* xStepsize;
            ship.y += yStepsize;
        }
    }


    Swarm.prototype._die = function() {
        Game.gameArea.removeChild(this.box); //remove debugging rectangle
        Game.gameArea.removeChild(this);
    }

    Swarm.prototype.tickMovement = function() {
        this.x += this.curDirection * this.xSpeed;
        this.moveEachShip(this.xSpeed, 0);
        if (this.x < 0 + this.regX || this.x >= (Game.transformedSize.x -this.width) ){
            console.log("stopping"+ this.x + "; " + this.y);
            this.curDirection *=-1;
            if(this.y < Game.transformedSize.y*0.5) {
                this.y += this.ySpeed;
                this.moveEachShip(0, this.ySpeed);
            }
        }

        if (Math.floor(Math.random()*1000) % 50 == 0) {
            this.shipsArray[Math.floor(Math.random()*this.shipsArray.length)].dropBomb();
        }
    }
    
    window.Swarm = Swarm;
}(window));