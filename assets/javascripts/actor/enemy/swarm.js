(function(window) {
    function Swarm(x,y,rows, cols) {
        this.initialize(x,y,rows,cols);
    }
    Swarm.prototype = new createjs.DisplayObject();
    Swarm.prototype.displayObjectInit = Swarm.prototype.initialize;
    Swarm.prototype.displayObjectTick = Swarm.prototype._tick;

    Swarm.prototype.initialize = function(x,y) {
        if (y >= swarmCommon.stateBorders.HIGHORBIT){
            alert("You are trying to spawn swarm at a position lower than the spawning Orbits boundaries!");
            return;
        }

        this.displayObjectInit();

        this.x = x;
        this.y = y;

        this.width = 0;
        this.height = 0;


        this.totalShips = 0;
        this.shipsArray = [];
    };

    Swarm.prototype._tick = function() {
        this.displayObjectTick();

        // Check if we have reached some orbit:
        var swarmLowEdge = this.y + this.height;
        if (swarmLowEdge >= swarmCommon.stateBorders.GROUND ){
            this.state = swarmCommon.states.GROUND;
        }
        else if (swarmLowEdge >= swarmCommon.stateBorders.LOWORBIT){
            this.state = swarmCommon.states.LOWORBIT;
        }
        
        else if (swarmLowEdge >= swarmCommon.stateBorders.MIDORBIT){
            this.state = swarmCommon.states.MIDORBIT;
        }

        else if (swarmLowEdge >= swarmCommon.stateBorders.HIGHORBIT && this.state !== swarmCommon.states.HIGHORBIT){
            this.state = swarmCommon.states.HIGHORBIT;
        }

        this.tickMovement();
        MDF.updateDebugRect(this);
    };


    Swarm.prototype.removeShip = function(ship){
        MDF.removeFromArray(ship, this.shipsArray);
        this.totalShips--;
        if (this.totalShips === 0){
            this._die();
        }
    };

    Swarm.prototype.move = function (xStepsize, yStepsize){
        this.x += xStepsize;
        this.y += yStepsize;
        this.moveEachShip(xStepsize, yStepsize);

    };

    Swarm.prototype.moveEachShip = function(xStepsize, yStepsize) {
        for (var i=0; i < this.shipsArray.length; i ++) {
            var ship = this.shipsArray[i];
            ship.x += xStepsize;
            ship.y += yStepsize;
        }
    };


    Swarm.prototype._die = function() {
        Game.gameArea.removeChild(this.box); //remove debugging rectangle
        Game.gameArea.removeChild(this);
    };



    
    window.Swarm = Swarm;
}(window));