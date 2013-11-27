var swarmCommon = {};

swarmCommon.gameAreaHeight = 2100; //WHOOOA HARDCODING LIEK A MOTHERFUCKER TEHRE 
swarmCommon.states = {
    SPAWNED: 0,
    HIGHORBIT: 1,
    MIDORBIT:  2,
    LOWORBIT: 3,
    GROUND: 4
    };

swarmCommon.stateBorders = {
    SPAWNED: swarmCommon.gameAreaHeight * -0.2,
    HIGHORBIT: swarmCommon.gameAreaHeight * 0,
    MIDORBIT: swarmCommon.gameAreaHeight * 0.27,
    LOWORBIT: swarmCommon.gameAreaHeight * 0.73,
    GROUND: swarmCommon.gameAreaHeight * 0.80
    };

swarmCommon.enemyTypes = {
	BASICENEMY: 0,
	FLYSHIP: 1
};
/** Creates a rows*cols rectangle of provided enemyType, ties these enemies to the given swarm*/
swarmCommon.fillWithEnemies = function(swarm, enemyType, rows, cols, paddingX, paddingY,offsetX, offsetY) {
            if (typeof(offsetX) ==='undefined') offsetX = 0;
            if (typeof(offsetY) ==='undefined') offsetY = 0;
            if (typeof(paddingX) ==='undefined') paddingX = 0;
            if (typeof(paddingY) ==='undefined') paddingY = 0;
            
            var enemiesToAdd = rows * cols;
            var swarmGlobalCoords = swarm.localToGlobal(0,0);

            for (var i = 0; i < enemiesToAdd ; i++){
                var row = Math.floor(i/cols);
                var col = i - cols*Math.floor(i/cols);

            //add the ship to the Stage, create a reference in swarms own array
                var enemy = swarmCommon.createEnemyByType(enemyType);
                enemy.x = offsetX + swarmGlobalCoords.x + (col * (enemy.width + paddingX));
                enemy.y = offsetY + swarmGlobalCoords.y + (row * (enemy.height + paddingY));
                enemy.swarm = swarm;
                swarm.shipsArray.push( Game.gameArea.addChild(enemy));

                if (row === 1) swarm.width += enemy.width + paddingX;
                if (col === 0) swarm.height += enemy.height + paddingY;
            }
            swarm.totalShips += enemiesToAdd;
    };

/** Creates an instance of a given enemy type and returns it
	@arg enemyType - type, defined by "swarmCommon.states" */
swarmCommon.createEnemyByType = function(enemyType){
    switch (enemyType){
        case (swarmCommon.enemyTypes.BASICENEMY):
            return new BasicEnemy(0,0,this);

        case (swarmCommon.enemyTypes.FLYSHIP):
            return new Flyship(0,0,this);
    }
};