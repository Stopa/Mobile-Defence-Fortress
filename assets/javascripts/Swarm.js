(function(window) {
    function Swarm(origX) {
        this.initialize(origX);
    }
    Swarm.prototype = new createjs.Container();
    Swarm.prototype.containerInit = Swarm.prototype.initialize;
    Swarm.prototype.containerTick = Swarm.prototype._tick;

    Swarm.prototype.curDirection = 1; //1 for right, -1 for left
    Swarm.prototype.initialize = function(origX) {
        this.containerInit();

        this.origX = origX;
    };

    Swarm.prototype._tick = function() {
        this.containerTick();
        this.tickMovement(1,5);
    };

    Swarm.prototype.tickMovement = function(horizontalDist, verticalDist) {
        this.x += this.curDirection * horizontalDist;
        if (Math.abs(this.origX - this.x) > 100 ) {
            this.curDirection *= -1;
            this.y += verticalDist;
        } 
        
        //!TODO - call movement / attack pattern method
    }



    
    window.Swarm = Swarm;
}(window));