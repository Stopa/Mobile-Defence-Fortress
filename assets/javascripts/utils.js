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

/*
* Clear and draw the debug rectangle around the argument object,
*   based on objects width and height. for 'visual debugging'
*/
MDF.updateDebugRect = function (object,color) {
    if (Game.debug){
        Game.gameArea.removeChild(object.box);

        object.box = new createjs.Shape();
        object.box.color = (color !== undefined) ? color : "#F00";
        object.box.width = object.width;
        object.box.height = object.height;
        object.box.regX = object.regX;
        object.box.regY = object.regY;

        Game.gameArea.addChild(object.box);
        var rectX = 0;
        var rectY = 0;

        object.box.graphics.clear();
        object.box.graphics.beginStroke(object.box.color);
        object.box.graphics.rect(
            object.x,
            object.y,
            object.box.width,
            object.box.height
        );
    }
}

/** remove an object from some argument array */
MDF.removeFromArray = function (object, array){
    var index = array.indexOf(object);
    array.splice(index,1);
}

/** Rotate a 2D point (px,py) by some angle theta in degrees (counterclockwise)
    around some point (ox,oy) */
MDF.rotatePoint = function(px,py,thetaDeg,ox,oy){
    thetaRad = thetaDeg* Math.PI / 180;
    return {
        x : Math.cos(thetaRad) * (px-ox) - Math.sin(thetaRad) * (py-oy) + ox,
        y : Math.sin(thetaRad) * (px-ox) + Math.cos(thetaRad) * (py-oy) + oy
    };
}

/** Assumes that an object's x and y coords mark the top
 * left corner of the object 
 */
MDF.getCenterPoint = function(object){
    return new createjs.Point((object.x + object.width*0.5),(object.y + object.height*0.5));
}
