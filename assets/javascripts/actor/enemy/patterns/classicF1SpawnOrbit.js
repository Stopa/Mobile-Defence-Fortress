(function(window) {
    function ClassicF1SpawnOrbit(swarm) {
        this.initialize(swarm);
    }

    ClassicF1SpawnOrbit.prototype.initialize = function(swarm){
        this.swarm = swarm;
        
        //note that x-speed for the spawn orbit is automatically derived from the spawnOrbitSpeedY
        this.spawnOrbitSpeedY = 1; //HARDCODE
        this.curDirectionX = 1;
    };
    /** Approaches current target directly until reaches high orbit*/
    ClassicF1SpawnOrbit.prototype.tick = function(){
        var swarmCenterPt = MDF.getCenterPt(this.swarm);
        var targetCenterPt = MDF.getCenterPt(this.swarm.currentTarget);
        //detect whether the target is to the right or left of us:
        this.curDirectionX = (swarmCenterPt.x <= targetCenterPt.x) ? 1 : -1;
        
        // Approach the area above our target if we're not directly above them yet.
        if (Math.abs(swarmCenterPt.x - targetCenterPt.x) > this.spawnOrbitSpeedX){
            this.swarm.move(this.curDirectionX * this.spawnOrbitSpeedX, this.spawnOrbitSpeedY);
        } else {
            //We're above our target. let's just descend.
            this.swarm.move(0,this.spawnOrbitSpeedY);
            this.curDirectionX *=-1;
        }
    };

    ClassicF1SpawnOrbit.prototype.updateXSpeed = function(){
        this.spawnOrbitSpeedX = this.determineXSpeedOnTargeting();
    };

    /** This method returns an x-speed value which guarantees
     *  that no matter what spawnOrbitSpeedY is, we always reach the spot
     *  above the target in highorbit exactly on time for both axes
    */
    ClassicF1SpawnOrbit.prototype.determineXSpeedOnTargeting = function(){
        var targetCenterPt = MDF.getCenterPt(this.swarm.currentTarget);
        var swarmCenterPt = MDF.getCenterPt(this.swarm);

        xDist2Travel = Math.abs(targetCenterPt.x - swarmCenterPt.x );
        yDist2Travel = (swarmCommon.stateBorders.HIGHORBIT  - (this.swarm.y + this.swarm.height));
        return  this.spawnOrbitSpeedY * xDist2Travel / yDist2Travel;
    };

    window.ClassicF1SpawnOrbit = ClassicF1SpawnOrbit;
}(window));