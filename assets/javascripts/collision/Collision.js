var Collision = {};

Collision.QuadtreeTick = function (game, quadtree, stage){
    if(!this.destructableClasses) {
        this.destructableClasses = [Destructible,GroundColumn];
    }
    if(!this.destructingClasses) {
        this.destructingClasses = [Projectile,DamagingExplosion];
    }
    //Clear the quadtree and add all collider objects
    quadtree.clear();
    for (var i = 0; i < stage.children.length; i++) {
        var child = stage.getChildAt(i);
        for(var j = 0;j < this.destructableClasses.length;j++) {
            if(child instanceof this.destructableClasses[j]) quadtree.insert(child);
        }
    }
    //go through each object and retrieve a list of objects it could 
    //possibly collide with.
    var returnObjects = [];
    for (var i = 0; i < stage.children.length; i++) {
        var child = stage.getChildAt(i);
        var rightKind = false;
        for(var j = 0; j < this.destructingClasses.length; j++) {
            if(child instanceof this.destructingClasses[j]) {
                rightKind = true;
            }
        }
        if(rightKind) {
            returnObjects.length = 0;
            quadtree.retrieve(returnObjects, child);
            
            for (var j = 0; j < returnObjects.length; j++) {
                if (Collision.algorithm(child, returnObjects[j])) {
                    Collision.handleCollision(child, returnObjects[j]);
                    break;
                }
            }
        }
    }
}

Collision.handleCollision = function(object1, object2){
    //should projectile and actor stats be taken into account here or
    //somewhere else?
    if(!object1.collidedWith) {
        object1.collidedWith = [];
    }
    object1.collidedWith.push(object2.id);
    object1.collision(object2);
    object2.collision(object1);

}

/**
*   Uses Separated Axes Theorem (SAT) to check if two shapes collide
*	@returns boolean- whether the objects collide 
*/
Collision.algorithm = function (object1, object2){
	/*These early return checks are  needed to avoid doublechecking collisions, 
     (ie., we want to avoid the scenario where): 
          1st check: did A collide with B?
        , 2nd check: did B collide with A? */
    var object1IsDestructing = false,
        object2IsDestructible = false,
        object2IsNotDestructing = true;

    for(var i = 0; i < this.destructableClasses.length; i++) {
        if(object2 instanceof this.destructableClasses[i]) object2IsDestructible = true;
    }
    for(var i = 0; i < this.destructingClasses.length; i++) {
        if(object1 instanceof this.destructingClasses[i]) object1IsDestructing = true;
        if(object2 instanceof this.destructingClasses[i]) object2IsNotDestructing = false;
    }
    if ((object1.faction == object2.faction || !object1IsDestructing || !object2IsDestructible || !object2IsNotDestructing) || object1.collidedWith && object1.collidedWith.indexOf(object2.id) != -1) return false;

    //Construct hitboxes
    var obj1Box = new Hitbox(object1.x, object1.y, object1.width, object1.height, object1.rotation);
    var obj2Box = new Hitbox(object2.x, object2.y, object2.width, object2.height, object2.rotation);

    //check if the hitboxes collided
    var collided = SAT.testPolygonPolygon(obj1Box.vectorBox,obj2Box.vectorBox);

    if (collided) {
        if (Game.debug){
            obj1Box.drawCorners();
            obj2Box.drawCorners();
        }
    }
    return collided;

};

