(function(window) {

    function Swarm(rows,cols, shipxPadding) {
        this.initialize(rows,cols,shipxPadding);
    }
    Swarm.prototype = new createjs.Container();
    Swarm.prototype.containerInit = Swarm.prototype.initialize;
    Swarm.prototype.containerTick = Swarm.prototype._tick;

    Swarm.prototype.curDirection = 1; //1 for right, -1 for left
    Swarm.prototype.initialize = function(rows,cols,shipxPadding) {
        this.containerInit();

        //for n ships, we have (n-1) paddings. 
        //so first ship will not add a padding to width
        this.width = -shipxPadding;
        this.height= 0;
        this.shipxPadding = shipxPadding;

        //create a (rows x cols) matrix to store the ships in
        this.ships = [];
        for (var i=0 ; i < rows; i++){
            this.ships[i] = [];
            for (var j=0; j < cols; j++ ) {
                this.ships[i][j] = undefined;
            }
        }


        //create a rectangle which shows the swarms height and width, for debugging
        if (Game.debug){
            this.shape2 = new createjs.Shape();
            this.shape2.x = 0;
            this.shape2.y = 0;
            this.addChild(this.shape2);
        }
    };

    Swarm.prototype._tick = function() {
        this.containerTick();
        this.tickMovement(5,30); // HARDCODE: swarm x-speed, y-speed
    };


    /** Adds an enemy of type 'ship' to the matrix of this swarm. 'swarmPos' is
    a 2 element array [row,col] to position the ship within the matrix */
    Swarm.prototype.addShip = function(ship, swarmPos) {
        this.addChild(ship);
        if (swarmPos != undefined){
            var row = swarmPos[0];
            var col = swarmPos[1];

            ship.x = col*ship.width + col*this.shipxPadding;
            ship.y = row * ship.height;
        
            //update swarm containers width and height, if necessary
            if (this.width < (col+1)*ship.width+ col*this.shipxPadding){
                this.width += ship.width + this.shipxPadding;
            }
            this.height += (this.height < (row+1)*ship.height) ? ship.height: 0;
            
            this.regX = this.width*0.5;
        }

        if (Game.debug) this.updateDebuggingRectangle();
    }


    Swarm.prototype.updateDebuggingRectangle = function () {
         this.shape2.graphics.clear().beginStroke("#F00").rect(0,0,this.width,this.height);
    }

    Swarm.prototype.tickMovement = function(xSpeed, ySpeed) {
        this.x += this.curDirection * xSpeed;

        if (this.x < 0 + this.width*0.5 || this.x >= Game.canvasWidth - this.width*0.5 ){
            this.curDirection *=-1;
            this.y += ySpeed;
        }

        //!TODO: Handle land approaching
    }

    
    window.Swarm = Swarm;
}(window));