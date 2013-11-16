(function(window) {
    function FormationClassicF1(x,y) {
        this.initialize(x,y);
    }
    FormationClassicF1.prototype = new Swarm();
    FormationClassicF1.prototype.swarmInit = FormationClassicF1.prototype.initialize;
    FormationClassicF1.prototype.swarmTick = FormationClassicF1.prototype._tick;
    FormationClassicF1.prototype.initialize = function(x,y) {
        this.swarmInit(x,y);

        
        this.xSpeed = 3;
        this.ySpeed = BasicEnemy.width; //move down by one bodyheight of tallest enemy in the swarm

        this.state = swarmCommon.states.SPAWNED;
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
        this.swarmTick();
    };


    window.FormationClassicF1 = FormationClassicF1;
}(window));