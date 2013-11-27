(function(window) {
    function FormationClassicF1(x,y) {
        this.initialize(x,y);
    }
    FormationClassicF1.prototype = new Swarm();
    FormationClassicF1.prototype.swarmInit = FormationClassicF1.prototype.initialize;
    FormationClassicF1.prototype.swarmTick = FormationClassicF1.prototype._tick;
    FormationClassicF1.prototype.swarmTickMovement = FormationClassicF1.prototype.tickMovement;
    FormationClassicF1.prototype.initialize = function(x,y) {
        this.swarmInit(x,y);

        this.state = swarmCommon.states.SPAWNED;
        this.patternSpawnOrbit = new ClassicF1SpawnOrbit(this);
        this.patternHighOrbit = new ClassicF1HighOrbit(this);
        this.patternLowOrbit = new ClassicF1LowOrbit(this);
        this.patternGround = new ClassicF1Ground(this);
        this.fillSwarm();

    };


    FormationClassicF1.prototype.fillSwarm = function() {
    // Add 3 rows x 6 columns of BasicEnemies
        swarmCommon.fillWithEnemies(
            this,
            swarmCommon.enemyTypes.BASICENEMY,
            3,6, // rows, cols
            0,40); //paddingX, paddingY


    // 1 rows x 7 columns of Flyships, each one center aligned in their col
        flySwarmsOffsetX =  0.5 * (BasicEnemy.width - Flyship.width ) ;
        flySwarmsOffsetY =  this.height;

        swarmCommon.fillWithEnemies(
            this,
            swarmCommon.enemyTypes.FLYSHIP,
            1, 6, //rows, cols
            flySwarmsOffsetX*2, 0, //paddingX, paddingY
            flySwarmsOffsetX, flySwarmsOffsetY ); //offsetX, offsetY
    };

    FormationClassicF1.prototype._tick = function() {
        this.targetingBehavior();
        this.swarmTick();

        
    };

    FormationClassicF1.prototype.tickMovement = function(){
        switch(this.state){
            case swarmCommon.states.SPAWNED:
                this.patternSpawnOrbit.tick();
                break;
            case swarmCommon.states.HIGHORBIT:
                this.patternHighOrbit.tick();
                break;
            case swarmCommon.states.MIDORBIT:
                this.patternHighOrbit.tick();
                break;
            case swarmCommon.states.LOWORBIT:
                this.patternLowOrbit.tick();
                break;
            case swarmCommon.states.GROUND:
                this.patternGround.tick();
                break;
        }
    };

    /** Chooses a target randomly, if one hasn't been chosen yet / the chosen one is dead.
     In addition, adjusts x-speed of swarm so that our movement towards the target
     is in sync with the y-speed */
    FormationClassicF1.prototype.targetingBehavior = function(){
        //Target someone if we haven't already
        if (!this.currentTarget){
            var targetTypes = [Facility];
            this.currentTarget= AI.findTarget(this, targetTypes, AI.randomTarget);

            //!TODO If targeting method fails to find ANY target, handle this case
            //This is a quick cheap workaround wich chooses a random groundcolumn if out of
            //targets
            if (!this.currentTarget){
                console.log("Out of targets in FormationClassicF1");
                this.currentTarget= AI.findTarget(this, [GroundColumn], AI.randomTarget);
            }
            else { MDF.updateDebugRect(this.currentTarget, "#FF66CC");}

        } else {
            //If our target turns out to be dead, get rid of 'em
            if(this.currentTarget.baseHitpoints <= 0) {
                Game.gameArea.removeChild(this.currentTarget.box); //remove debugging rectangle
                this.currentTarget = undefined;

                this.targetingBehavior(); //keep trying to find a target
            }
        }
        //Adjust our x-speed for spawning movement now that we know where our target is.
        if (this.state == swarmCommon.states.SPAWNED) this.patternSpawnOrbit.updateXSpeed();
    };



    FormationClassicF1.prototype.bodyUnit = 99;
    FormationClassicF1.prototype.xSpeed = 6;
    FormationClassicF1.prototype.ySpeed = 2;

    window.FormationClassicF1 = FormationClassicF1;
}(window));