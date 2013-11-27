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
            this.ticksTilNextMovementStart -= 1;
        }
    };

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