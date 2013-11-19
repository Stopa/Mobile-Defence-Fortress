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
        }

        this.displayObjectInit();

        this.x = x;
        this.y = y;

        this.width = 0;
        this.height = 0;

        this.curDirectionX = 1; //1 for right, -1 for left

        //note that x-speed for the spawn orbit is automatically derived from the spawnOrbitSpeedY
        this.spawnOrbitSpeedY = 1; //HARDCODE

        this.totalShips = 0;
        this.shipsArray = [];
    };

    Swarm.prototype._tick = function() {
        this.displayObjectTick();
        this.tickMovement();
        if (this.x < 0 ){ this.x = 0; } else
        if (this.x+this.width >= Game.transformedSize.x ){
            this.x = Game.transformedSize.x -this.width;}
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

    Swarm.prototype.tickMovement = function() {
        this.x += this.curDirectionX * this.xSpeed;
        this.moveEachShip(this.curDirectionX*this.xSpeed, 0);
        if (this.x < 0 || (this.x+this.width) >= (Game.transformedSize.x) ){
            this.curDirectionX *=-1;
            if(this.y < Game.transformedSize.y*0.5) {
                this.y += this.ySpeed;
                this.moveEachShip(0, this.ySpeed);
            }
        }

        if (Math.floor(Math.random()*1000) % 50 === 0) {
            this.shipsArray[Math.floor(Math.random()*this.shipsArray.length)].dropBomb();
        }
    };

    Swarm.prototype.tickSpawnApproachTarget = function(){
        var swarmCenterPt = MDF.getCenterPoint(this);
        var targetCenterPt = MDF.getCenterPoint(this.currentTarget);
        //detect whether the target is to the right or left of us:
        this.curDirectionX = (swarmCenterPt.x <= targetCenterPt.x) ? 1 : -1;
        
        // Approach the area above our target if we're not directly above them yet.
        if (Math.abs(swarmCenterPt.x - targetCenterPt.x) > this.spawnOrbitSpeedX &&
            this.x > 0 && (this.x+this.width) < (Game.transformedSize.x)){ //also check that we're not out of the gameArea
            this.move(this.curDirectionX * this.spawnOrbitSpeedX, this.spawnOrbitSpeedY);
        } else {
            //We're above our target. let's just descend.
            this.move(0,this.spawnOrbitSpeedY);
            this.curDirectionX *=-1;
        }
    };

    /** This method returns an x-speed value which guarantees
     *  that no matter spawnOrbitSpeedY is, we always reach the spot
     *  above the target in highorbit exactly time for both axes
    */
    Swarm.prototype.determineXSpeedOnTargeting = function(){
        var targetCenterPt = MDF.getCenterPoint(this.currentTarget);
        var swarmCenterPt = MDF.getCenterPoint(this);

        xDist2Travel = Math.abs(targetCenterPt.x - swarmCenterPt.x );
        yDist2Travel = (swarmCommon.stateBorders.HIGHORBIT  - (this.y + this.height));
        return  this.spawnOrbitSpeedY * xDist2Travel / yDist2Travel;
    };
    
    window.Swarm = Swarm;
}(window));