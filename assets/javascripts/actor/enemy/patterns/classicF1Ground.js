(function(window) {
    function ClassicF1Ground(swarm) {
        this.initialize(swarm);
    }

    ClassicF1Ground.prototype.initialize = function(swarm){
        this.swarm = swarm;
        this.currentMovementTicksPassed = 0;
        this.ticksTilNextMovementStart = 0;
        this.currentDir = [1,-1][Math.floor(Math.random()*2)];
        this.hoverAnimationTicks = 0;
    };

    /** After Ground is reached, move horizontally to random direction for 1 seconds, 
      *stay there for 2 seconds, then come back. Do this after every 4-10 seconds. */
    ClassicF1Ground.prototype.tick = function(){
        this.hoverAnimationTick();
        //!TODO, maybe make this stuff work ´based on states ("approaching midpoint of target", etc)
        if (this.ticksTilNextMovementStart >= 1){
            if (MDF.xCenterDistance(this.swarm,this.swarm.currentTarget) > this.swarm.width/2){
                this.currentDir = (MDF.getCenterPt(this.swarm).x <= MDF.getCenterPt(this.swarm.currentTarget).x) ? 1 : -1;
                this.swarm.move(this.currentDir*this.swarm.xSpeed, 0);
            }
            this.ticksTilNextMovementStart -= 1;
        } else {
            this.aboveTargetBehaviour();
        }
    };

    ClassicF1Ground.prototype.aboveTargetBehaviour= function(){
        if (this.ticksTilNextMovementStart < 1){
                if (this.currentMovementTicksPassed < 240){
                    if (this.currentMovementTicksPassed < 60){ //During the first second, move to a random direction
                        this.swarm.move(this.swarm.xSpeed* this.currentDir, 0);
                    } else {
                        if (this.currentMovementTicksPassed >= 180){ //During the seconds 2-3, wait,
                            this.swarm.move(this.swarm.xSpeed * -this.currentDir, 0); //during the final, fourth second, move back to where we were
                        }
                    }
                    this.currentMovementTicksPassed+=1;
                } else {
                    //We're done with our current movement, schedule next movement
                    this.ticksTilNextMovementStart = createjs.Ticker.getFPS()*Math.floor((Math.random()*7)+4);
                    this.currentDir = [1,-1][Math.floor(Math.random()*2)];
                    this.currentMovementTicksPassed=0;
                }
            } else {
                
            }
    }

    ClassicF1Ground.prototype.hoverAnimationTick= function(){
        if (Math.floor((this.hoverAnimationTicks-1)*0.07) < 6){
            this.swarm.move(0, 1);
        } else {
            this.swarm.move(0, -1);
            if (Math.floor(this.hoverAnimationTicks*0.07)>=12){
                //restart the loop
                this.flag=true;
                this.hoverAnimationTicks=0;
            }
        }
        this.hoverAnimationTicks+=1;
    };



    window.ClassicF1Ground = ClassicF1Ground;
}(window));