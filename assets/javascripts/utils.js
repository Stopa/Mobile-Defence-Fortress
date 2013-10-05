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
*   Draws a rectangle around the argument object,
*   based on objects width and height. for 'visual debugging'
*   @param container - the container which shall hold the rectangle as a child (by default: the arg object itself)
*/
MDF.createDebugRect = function (object, color, container) {
    if (Game.debug){
        object.box = new createjs.Shape();
        
        object.box.color = (color !== undefined) ? color : "#F00";
        object.box.width = object.width;
        object.box.height = object.height;
        //object.box.regX = object.regX;
        object.box.regY = object.regY;

        if (container !== undefined) {
            object.box.container = container;
            container.addChild(object.box);
        } else {
            object.addChild(object.box);
        }
    }
}
/*
* Clear and (re)draw the debug rectangle (for example, call during every tick)
*/
MDF.updateDebugRect = function (object) {
    if (Game.debug){
        var rectX = 0;
        var rectY = 0;

        //if the container is something other than the object itself,
        // we need to take that into account
        if (object.box.container !== undefined){
            rectX = object.x;
            rectY = object.y;
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