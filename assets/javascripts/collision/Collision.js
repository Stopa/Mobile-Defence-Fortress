var Collision = {};

Collision.QuadtreeTick = function (game, quadtree, stage){
	//Clear the quadtree and add all colliding objects
    quadtree.clear();
    for (var i = 0; i < game.colliders.length; i++) {
        quadtree.insert(game.colliders[i]);
    }
    //go through each object and retrieve a list of objects it could 
    //possibly collide with.
    var returnObjects = [];
    for (var i = 0; i < game.colliders.length; i++) {
        returnObjects.length = 0;
        quadtree.retrieve(returnObjects, game.colliders[i]);

        for (var j = 0; j < returnObjects.length; j++) {
            if (Collision.algorithm(game.colliders[i], returnObjects[j])) {
                Collision.handleCollision(game.colliders[i], returnObjects[j]);
            }
        }
    }
}

Collision.handleCollision = function(object1, object2){
    //should projectile and actor stats be taken into account here or
    //somewhere else?

    //handle object1(projectile) related behaviour
    Collision.removeFromArray(object1, Game.colliders);
    object1.collision(object2);
    object2.collision(object1);

    //handle object2 (actor) behaviour  
}

/**
*!! NOT REALLY IMPLEMENTED YET. THIS IS A BASIC PLACEHOLDER
*	Supposed to use some kind of more expensive calculations to
*	detect if two objects which have been detected to have been near
*	eachother actually collide
*	@returns boolean- whether the objects collide 
*/
Collision.algorithm = function (object1, object2){
	/*Check that object1 is a projectile, and object2 is a destructible and NOT a projectile
    This is needed to avoid doublechecking collisions, 
     (ie., we want to avoid the scenario where): 
          1st check: did A collide with B?
        , 2nd check: did B collide with A? */
    if (! (object1 instanceof Projectile)) return false;
    if (! (object2 instanceof Destructible)) return false;
    if (object2 instanceof Projectile) return false;
    if (object1.faction == object2.faction) return false;
    //also check that the object1 and object2 are not of the same faction

	var point1 = object1.localToGlobal(0,0);
	var point2 = object2.localToGlobal(0,0);
	if (Math.abs (point1.x - point2.x) < 50 &&
		Math.abs (point1.y - point2.y) < 50){
		return true;
	} else {
		return false;
	}
};

/** remove an object from some argument array */
Collision.removeFromArray = function (object, array){
	var index = array.indexOf(object);
	array.splice(index,1);
}