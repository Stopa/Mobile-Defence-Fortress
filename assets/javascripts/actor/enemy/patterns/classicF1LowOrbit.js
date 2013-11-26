(function(window) {
    function ClassicF1LowOrbit(swarm) {
        this.initialize(swarm);
    }

    ClassicF1LowOrbit.prototype.initialize = function(swarm){
        this.swarm = swarm;
        this.curDirectionX = 1;
    };

    /** On low orbit, the ships stop above the original targeted area and keep bombing it*/
    ClassicF1LowOrbit.prototype.tick = function(){
        var swarmCenterPt = MDF.getCenterPt(this.swarm);
        var targetCenterPt = MDF.getCenterPt(this.swarm.currentTarget);
        //detect whether the target is to the right or left of us:
        this.curDirectionX = (swarmCenterPt.x <= targetCenterPt.x) ? 1 : -1;
        
        // Approach the area above our target if we're not directly above them yet.
        if (Math.abs(swarmCenterPt.x - targetCenterPt.x) > this.swarm.xSpeed){
            this.swarm.move(this.curDirectionX * this.swarm.xSpeed, 0);
        } else {
            //We're above our target. let's just descend.
            this.swarm.move(0,this.swarm.ySpeed);
            this.curDirectionX *=-1;
        }
    };



    window.ClassicF1LowOrbit = ClassicF1LowOrbit;
}(window));