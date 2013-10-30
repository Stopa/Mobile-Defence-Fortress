var Collision = {};

Collision.QuadtreeTick = function (game, quadtree, stage){
    //Clear the quadtree and add all collider objects
    quadtree.clear();
    for (var i = 0; i < stage.children.length; i++) {
        var child = stage.getChildAt(i);
        if (child instanceof Destructible) quadtree.insert(child);
    }
    //go through each object and retrieve a list of objects it could 
    //possibly collide with.
    var returnObjects = [];
    for (var i = 0; i < stage.children.length; i++) {
        var child = stage.getChildAt(i);
        if (child instanceof Projectile){
            returnObjects.length = 0;
            quadtree.retrieve(returnObjects, child);

            for (var j = 0; j < returnObjects.length; j++) {
                if (Collision.algorithm(child, returnObjects[j])) {
                    Collision.handleCollision(child, returnObjects[j]);
                }
            }
        }
    }
}

Collision.handleCollision = function(object1, object2){
    //should projectile and actor stats be taken into account here or
    //somewhere else?

    object1.collision(object2);
    object2.collision(object1);

}

/**
*!! Uses Separated Axes Theorem (SAT) to check if two shapes collide
*	@returns boolean- whether the objects collide 
*/
Collision.algorithm = function (object1, object2){
	/*These early return checks are  needed to avoid doublechecking collisions, 
     (ie., we want to avoid the scenario where): 
          1st check: did A collide with B?
        , 2nd check: did B collide with A? */
    if (! (object1 instanceof Projectile)) return false;
    if (! (object2 instanceof Destructible)) return false;
    if (object2 instanceof Projectile) return false;
    if (object1.faction == object2.faction) return false;



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

