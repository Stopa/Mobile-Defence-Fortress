(function(window) {
    function ClassicF1HighOrbit(swarm) {
        this.initialize(swarm);
    }

    ClassicF1HighOrbit.prototype.initialize = function(swarm){
        this.substates =  {
                descending : true,
                lastDescentX : 0,
                xDistTravelled : 0,
                yDistTravelled : 0,
                curDirection : 1
        };
        this.swarm = swarm;
    };
    
    /** Presumes a target is present*/
    ClassicF1HighOrbit.prototype.tick = function(){
        //Descend until we've travelled by one bodyunit:
        if (this.substates.descending && this.substates.yDistTravelled <= this.swarm.bodyUnit){
            this.swarm.move(0, this.swarm.ySpeed);
            this.substates.yDistTravelled += this.swarm.ySpeed;
            this.substates.lastDescentX = MDF.getCenterPt(this.swarm).x;
        }
        //otherwise, move towards target on the x axis while we havent travelled 6 bodyunits
        else {

            //We're done descending, 
            var targetXPosition = MDF.getCenterPt(this.swarm.currentTarget).x;
            var swarmXPosition = MDF.getCenterPt(this.swarm).x;

            //reset descending related info if we haven't already:
            if (this.substates.descending){
                this.substates.descending = false;
                this.substates.yDistTravelled = 0;
            }
            //also find a new direction to move, if we're just beginning our horizontal movement:
            if (this.substates.xDistTravelled === 0){
                this.substates.curDirection = (targetXPosition > swarmXPosition)? 1: -1;
            }

            this.swarm.move(this.swarm.xSpeed * this.substates.curDirection, 0);
            this.substates.xDistTravelled += this.swarm.xSpeed;

            /* Check if we've travelled too far from our target using these criteria:
                 (1) if weve traveled more than half our swarm width AND
                 (2) were further from the target than half the swarm width AND
                 (3) we're further from the last descent than half our bodywidth
                      OR
                 (4) we've travelled more than 6 bodyUnits.
            */
            if ((Math.abs(targetXPosition-swarmXPosition) > (this.swarm.width / 2) &&               // (1)
                    (this.substates.xDistTravelled > (this.swarm.width / 2))&&                      // (2)
                    (Math.abs(targetXPosition-this.substates.lastDescentX) < this.swarm.width/2)) ||// (3)
                    this.substates.xDistTravelled >= 6*this.swarm.bodyUnit){                        // (4)
                //we're done travelling sideways, reset x axis related info
                this.substates.descending = true;
                this.substates.xDistTravelled = 0;

            }
        }
    };
window.ClassicF1HighOrbit = ClassicF1HighOrbit;
}(window));