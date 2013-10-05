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


    //AN EXTREMELY QUICK TEMP WORKAROUND TO MAKE ENEMY BOMBS NOT COLLIDE WITH
    //ENEMIES THEMSELVES:
    if (object1.imagePath == 'assets/images/enemy/enemy_bomb.png') return;

    //handle object1(projectile) related behaviour
    Collision.removeFromArray(object1, Game.colliders);
    object1.parent.removeChild(object1);

    //handle object2 (actor) behaviour
    Collision.removeFromArray(object2, Game.colliders);
    object2.hitPoints -=101;
}

/**
*!! NOT REALLY IMPLEMENTED YET. THIS IS A BASIC PLACEHOLDER
*	Supposed to use some kind of more expensive calculations to
*	detect if two objects which have been detected to have been near
*	eachother actually collide
*	@returns boolean- whether the objects collide 
*/
Collision.algorithm = function (object1, object2){
	//Let's agree that projectiles hurt actors, not the other way around. 
	//So skip anything that isn't a projectile
	if (!(object1 instanceof Projectile) || !(object2 instanceof Enemy)) return false;
	//!TODO make the collision system work with object2 being instanceof Actor

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