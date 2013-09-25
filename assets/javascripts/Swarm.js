(function(window) {
    function Swarm(origX) {
        console.log("creating swarm");
        this.initialize(origX);
    }
    Swarm.prototype = new createjs.Container();
    Swarm.prototype.containerInit = Swarm.prototype.initialize;
    Swarm.prototype.containerTick = Swarm.prototype._tick;

    Swarm.prototype.curDirection = 1; //1 for right, -1 for left
    Swarm.prototype.initialize = function(origX) {
        this.containerInit();

        this.origX = origX;
        console.log("init-ed swarm with origX="+this.origX);
        console.log("init-ed swarm with this.X="+this.x);
    };

    Swarm.prototype._tick = function() {
        this.containerTick();
        this.tickMovement(1,5);
    };

    Swarm.prototype.tickMovement = function(horizontalDist, verticalDist) {
        console.log("swarm with origX="+this.origX);
        console.log("swarm with this.X="+this.x);
        this.x += this.curDirection * horizontalDist;
        if (Math.abs(this.origX - this.x) > 100 ) {
            this.curDirection *= -1;
            this.y += verticalDist;
        } 
        
        //!TODO - call movement / attack pattern method
    }



    
    window.Swarm = Swarm;
}(window));