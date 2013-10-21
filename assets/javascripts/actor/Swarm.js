(function(window) {

    function Swarm(x,y,rows, cols, shipxPadding) {
        this.initialize(x,y,rows,cols,shipxPadding);
    }
    Swarm.prototype = new createjs.Container();
    Swarm.prototype.containerInit = Swarm.prototype.initialize;
    Swarm.prototype.containerTick = Swarm.prototype._tick;

    Swarm.prototype.curDirection = 1; //1 for right, -1 for left
    Swarm.prototype.initialize = function(x,y,rows,cols,shipxPadding) {
        this.containerInit();

        this.x = x;
        this.y = y;
        //for n ships, we have (n-1) paddings. 
        //so first ship will not add a padding to width
        this.width = -shipxPadding;
        this.height= 0;
        this.totalShips = 0;
        this.shipxPadding = shipxPadding;

        //create a (rows x cols) matrix to store the ships in
        this.shipsArray = [];
        this.shipsMatrix = [];
        for (var i=0 ; i < rows; i++){
            this.shipsMatrix[i] = [];
            for (var j=0; j < cols; j++ ) {
                this.shipsMatrix[i][j] = undefined;
            }
        }
        this.fillMatrix(rows,cols);

    };

    Swarm.prototype._tick = function() {
        this.containerTick();
        this.tickMovement(2,30); // HARDCODE: swarm x-speed, y-speed
        MDF.updateDebugRect(this);
    };

    Swarm.prototype.fillMatrix = function(rows, cols) {
            var enemiesToAdd = rows * cols;
            var shipWidth = 69; // HARDCODEEE
            var shipHeight = 50; //HARDCODEEEE

            this.width = cols*shipWidth + (cols-1) * this.shipxPadding;
            this.height = rows * shipHeight;
            this.regX = this.width*0.5;

            for (var i = 0; i < enemiesToAdd ; i++){
                var row = Math.floor(i/rows);
                var col = i - rows*Math.floor(i/rows);
                //add the ship to the Stage, create a reference in swarms own matrix
                var swarmGlobalCoords = this.localToGlobal(0,0);
                var enemy = new Enemy(
                    swarmGlobalCoords.x + (col * shipWidth + col*this.shipxPadding),
                    swarmGlobalCoords.y + (row * shipHeight),
                    shipWidth, shipHeight,
                    this);  //reference to ships swarm

                this.shipsArray.push( Stage.addChild(enemy));
            }
            this.totalShips = enemiesToAdd;

            
    };

    Swarm.prototype.removeShip = function(ship){
        Collision.removeFromArray(ship, this.shipsArray);
        this.totalShips--;
        if (this.totalShips === 0){
            this._die();
        }
    }

    Swarm.prototype.moveEachShip = function(xStepsize, yStepsize) {
        for (var i=0; i < this.shipsArray.length; i ++) {
            var ship = this.shipsArray[i];
            ship.x += this.curDirection* xStepsize;
            ship.y += yStepsize;
        }
    }


    Swarm.prototype._die = function() {
        Stage.removeChild(this.box); //remove debugging rectangle
        Stage.removeChild(this);
    }

    Swarm.prototype.tickMovement = function(xSpeed, ySpeed) {
        this.x += this.curDirection * xSpeed;
        this.moveEachShip(xSpeed, 0);
        if (this.x < 0 + this.regX || this.x >= (Game.canvasWidth - this.regX) ){
            this.curDirection *=-1;
            if(this.y < Stage.canvas.clientHeight*0.5) {
                this.y += ySpeed;
                this.moveEachShip(0, ySpeed);
            }
        }

        if (Math.floor(Math.random()*1000) % 50 == 0) {
            this.shipsArray[Math.floor(Math.random()*this.children.length)].dropBomb();
        }
    }
    
    window.Swarm = Swarm;
}(window));