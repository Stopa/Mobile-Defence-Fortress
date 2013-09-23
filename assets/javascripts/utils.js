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