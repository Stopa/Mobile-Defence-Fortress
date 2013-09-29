var MDF = {};

/*
* Get the X and Y speeds for moving a point at a given angle (in degrees)
*/
MDF.angleSpeeds = function(angle) {
	return {
        x: Math.cos(angle*Math.PI/180),
        y: -1*Math.sin(angle*Math.PI/180)
    };
}

MDF.createDebugRect = function (object) {
	//draw a rectangle which based on objects width and height
	//for 'visual debugging'
        if (Game.debug){
            object.shape = new createjs.Shape();
            object.shape.x = 0;
            object.shape.y = 0;
            object.addChild(object.shape);
        }
}

MDF.updateDebugRect = function (object) {
	object.shape.graphics.clear().beginStroke("#F00").rect(0,0,object.width,object.height);
}