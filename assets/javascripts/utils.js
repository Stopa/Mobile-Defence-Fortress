var MDF = {};

/*
* Get the X and Y speeds for moving a point at a given angle (in degrees)
*/
MDF.angleSpeeds = function(angle) {
    return {
        x: Math.cos(angle*Math.PI/180),
        y: -1*Math.sin(angle*Math.PI/180)
    };
};

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

        object.box.graphics.clear();
        object.box.graphics.beginStroke(object.box.color);
        object.box.graphics.rect(
            object.x,
            object.y,
            object.box.width,
            object.box.height
        );
    }
};

/** remove an object from some argument array */
MDF.removeFromArray = function (object, array){
    var index = array.indexOf(object);
    array.splice(index,1);
};

/** Rotate a 2D point (px,py) by some angle theta in degrees (counterclockwise)
    around some point (ox,oy) */
MDF.rotatePoint = function(px,py,thetaDeg,ox,oy){
    thetaRad = thetaDeg* Math.PI / 180;
    return {
        x : Math.cos(thetaRad) * (px-ox) - Math.sin(thetaRad) * (py-oy) + ox,
        y : Math.sin(thetaRad) * (px-ox) + Math.cos(thetaRad) * (py-oy) + oy
    };
};

/** Assumes that an object's x and y coords mark the top
 * left corner of the object 
 */
MDF.getCenterPt = function(object){
    return new createjs.Point((object.x + object.width*0.5),(object.y + object.height*0.5));
};

/** Returns distance between two given objects. Objects need to have x and y defined
 */
MDF.distance = function(object1, object2) {
    var object1GlobalPosition = object1.parent.localToLocal(object1.x,object1.y,Game.gameArea),
        object2GlobalPosition = object2.parent.localToLocal(object2.x,object2.y,Game.gameArea),
        deltaX = object1GlobalPosition.x-object2GlobalPosition.x,
        deltaY = object1GlobalPosition.y-object2GlobalPosition.y;

    return Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));
};

/** Returns distance distance of two object's centers projected on the x axis.
 * Objects need to have x,y,width defined
 */
MDF.xCenterDistance = function(object1, object2) {
    if (object1.parent === null) console.error("Object1 has no parent");
    var object1GlobalPosition = object1.parent.localToLocal(object1.x,object1.y,Game.gameArea),
        object2GlobalPosition = object2.parent.localToLocal(object2.x,object2.y,Game.gameArea);
    return Math.abs(object1GlobalPosition.x-object2GlobalPosition.x);
};


MDF.drawOrbits = function(){
    if (Game.debug){
        Game.gameArea.removeChild(Game.orbits);
        Game.orbits = new createjs.Shape();
        Game.orbits.graphics.setStrokeStyle(5).beginStroke("#F00");


        var areaX = Game.gameArea.getBounds().width;
        

        for (var border in swarmCommon.stateBorders){

            var borderY = swarmCommon.stateBorders[border];
            var text = new createjs.Text(border, "23px Arial", "#ff7700");
            text.x = 500;
            text.y = borderY + 60;
            text.textBaseline = "alphabetic";
            Game.gameArea.addChild(text);

            Game.orbits.graphics.moveTo(0,borderY);
            Game.orbits.graphics.lineTo(areaX, borderY);
        }
        Game.gameArea.addChild(Game.orbits);
    }
};

