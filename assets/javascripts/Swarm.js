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

        //for n ships, we have (n-1) paddings. 
        //so first ship will not add a padding to width
        this.width = -shipxPadding;
        this.height= 0;
        this.totalShips = 0;
        this.shipxPadding = shipxPadding;

        //create a (rows x cols) matrix to store the ships in
        this.shipsMatrix = [];
        for (var i=0 ; i < rows; i++){
            this.shipsMatrix[i] = [];
            for (var j=0; j < cols; j++ ) {
                this.shipsMatrix[i][j] = undefined;
            }
        }

        this.fillMatrix(rows,cols);
        MDF.createDebugRect(this);


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

            for (var i = 0; i < enemiesToAdd ; i++){
                var row = Math.floor(i/rows);
                var col = i - rows*Math.floor(i/rows);
                this.addChild(new Enemy(true,shipWidth, shipHeight,
                    (col* shipWidth + col*this.shipxPadding),
                    (row * shipHeight),
                    [row,col]));
            }
            this.totalShips = enemiesToAdd;

            this.width = cols*shipWidth + (cols-1) * this.shipxPadding;
            this.height = rows * shipHeight;
            this.regX = this.width*0.5;
    };

    Swarm.prototype.removeShip = function(ship){
        this.totalShips--;
        if (this.totalShips === 0){
            this.destroy();
        }
    }

    Swarm.prototype.destroy = function() {
        Stage.removeChild(this);
    }

    Swarm.prototype.tickMovement = function(xSpeed, ySpeed) {
        this.x += this.curDirection * xSpeed;
        if (this.x < 0 + this.regX || this.x >= (Game.canvasWidth - this.regX) ){
            this.curDirection *=-1;
            console.log(this.y, Stage.canvas.clientHeight*0.5)
            if(this.y < Stage.canvas.clientHeight*0.5) {
                this.y += ySpeed;
            }
        }

        if (Math.floor(Math.random()*1000) % 50 == 0) {
            this.children[Math.floor(Math.random()*this.children.length)].dropBomb(); 
            //!TODO : using this.children also tries to call dropBomb() from the debugrect
        }
    }
    
    window.Swarm = Swarm;
}(window));