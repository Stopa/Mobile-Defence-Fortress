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
    Stage.removeChild(object.box);
    if (Game.debug){

        object.box = new createjs.Shape();
        object.box.color = (color !== undefined) ? color : "#F00";
        object.box.width = object.width;
        object.box.height = object.height;
        object.box.regX = object.regX;
        object.box.regY = object.regY;

        Stage.addChild(object.box);
        var rectX = 0;
        var rectY = 0;

        rectX = object.x;
        rectY = object.y;
        //if the container is something other than the object itself,
        // we need to take that into account
        if (object.box.container !== undefined){
        }
        object.box.graphics.clear();
        object.box.graphics.beginStroke(object.box.color);
        object.box.graphics.rect(
            rectX,
            rectY,
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