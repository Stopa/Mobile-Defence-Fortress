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
        this.xSpeed = 3;
        this.ySpeed = BasicEnemy.width; //move down by one bodyheight of tallest enemy in the swarm

        this.state = swarmCommon.states.SPAWNED;
        this.fillSwarm();
        //this.range = 1200; // https://www.dropbox.com/s/paqyrdnksc5mgqn/Screenshot%202013-11-20%2000.37.09.png
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
        this.swarmTick();

        // Check if we have reached some orbit
        var swarmLowEdge = this.y + this.height;
        // if (this.flag) debugger;
        if (swarmLowEdge >= swarmCommon.stateBorders.HIGHORBIT){
            this.state = swarmCommon.states.HIGHORBIT;

            if (swarmLowEdge >= swarmCommon.stateBorders.MIDORBIT){
                this.state = swarmCommon.states.MIDORBIT;

                if (swarmLowEdge >= swarmCommon.stateBorders.LOWORBIT){
                    this.state = swarmCommon.states.LOWORBIT;
                }
            }
        }
    };

    FormationClassicF1.prototype.tickMovement = function(){
        switch(this.state){
            case swarmCommon.states.SPAWNED:
                this.spawnBehavior();
                break;
            case swarmCommon.states.HIGHORBIT:
                this.swarmTickMovement();
                break;
            case swarmCommon.states.MIDORBIT:
                break;
            case swarmCommon.states.LOWORBIT:
                break;
        }
    };

    FormationClassicF1.prototype.spawnBehavior = function(){
        //Target someone if we haven't already
        if (!this.currentTarget){
            var targetTypes = [Facility];
            this.currentTarget= AI.findTarget(this, targetTypes, AI.randomTarget);
            //Adjust our x-speed now that we know where our target is.
            this.spawnOrbitSpeedX = this.determineXSpeedOnTargeting();
        } else {
            //If our target turns out to be dead, get rid of 'em
            if(this.currentTarget.baseHitpoints <= 0) {
                this.currentTarget = undefined;
                return;
            }
        }
        this.tickSpawnApproachTarget();
    };

    window.FormationClassicF1 = FormationClassicF1;
}(window));