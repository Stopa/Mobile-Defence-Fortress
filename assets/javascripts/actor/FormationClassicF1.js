(function(window) {
    const SWARMSTATES = {
    SPAWNED: 0,
    HIGHORBIT: 1,
    MIDORBIT:  2,
    LOWORBIT: 3
    }

    function FormationClassicF1(x,y) {
        this.initialize(x,y);
    }
    FormationClassicF1.prototype = new Swarm();
    FormationClassicF1.prototype.swarmInit = FormationClassicF1.prototype.initialize;
    FormationClassicF1.prototype.swarmTick = FormationClassicF1.prototype._tick;
    FormationClassicF1.prototype.initialize = function(x,y) {
        //!TODO modify swarm.js so we can call swarmInit here

        /** --the following is identical to swarm.js Initialize !!! ---*/
        this.containerInit();
        this.x = x;
        this.y = y;
        //for n ships, we have (n-1) paddings. 
        //so first ship will not add a padding to width
        this.shipxPadding = 50;
        this.width = -this.shipxPadding;
        this.height= 0;
        this.totalShips = 0;

        //create a (rows x cols) matrix to store the ships in
        this.shipsArray = [];

        /**-------end of identical code !!! --------*/

        this.state = SWARMSTATES.SPAWNED;

        var xSpeed = 3;
        var ySpeed = 2;

        this.maxShipW = 99;
        this.maxShipH = 47;
        
        this.fillSwarm();
        
    };




    /** a cheap hack implementation for the filling of this swarm
    !TODO - make this method nice*/
    FormationClassicF1.prototype.fillSwarm = function() {
        this.fillMatrix(3,6);
        row = 4;

        shipWidth = 48;
        shipHeight = 47;
        alignPadding = (this.maxShipW - shipWidth)*0.5;  //use this to align narrower object to the center of a wider object on the same col
        for (var i=0; i<6;i++) {
            var col = i - 6*Math.floor(i/6);
            //add the ship to the Stage, create a reference in swarms own matrix
            var swarmGlobalCoords = this.localToGlobal(0,0);
            var flyship = new Flyship(
                swarmGlobalCoords.x + (2*i+1)*alignPadding + (col *(shipWidth + this.shipxPadding)),
                swarmGlobalCoords.y + (row * shipHeight),
                this);  //reference to ships swarm

            this.shipsArray.push( Game.gameArea.addChild(flyship));
        }
    };

    FormationClassicF1.prototype._tick = function() {
        this.swarmTick();
    };

    FormationClassicF1.prototype.moveEachShip = function (){
        switch (this.state){
            case SWARMSTATES.SPAWNED:

                break;
            case SWARMSTATES.HIGHORBIT:
                break;
            case SWARMSTATES.MIDORBIT:
                break;
            case SWARMSTATES.LOWORBIT:
                break;
        }
    };

    window.FormationClassicF1 = FormationClassicF1;
}(window));