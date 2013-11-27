var AI = {};


/** Finds a suitable target in gameArea.children array which matches any of the
  *  provided targetTypes and is within range of targeter, returns first suitable
  *  if no decisionMethod callback provided, otherwise calls it with all suitable
  *  targets array and returns the returned valus.
  */
AI.findTarget = function(targeter, targetTypes, decisionMethod) {
    var targets = [];

    for(var i = 0; i < Game.gameArea.children.length; i++) { // TODO - can be done more efficiently, e.g. with collision?
        targetTypeLoop:
        for(var j = 0; j<targetTypes.length; j++) {
            if(Game.gameArea.children[i].faction !== targeter.faction &&
                Game.gameArea.children[i] instanceof targetTypes[j]) {
                var distance = MDF.distance(Game.gameArea.children[i], targeter);

                if(!targeter.range || distance < targeter.range) { // TODO - should choose the closest target instead of a random one?
                    if(decisionMethod) {
                        targets.push(Game.gameArea.children[i]);
                        break targetTypeLoop;
                    } else {
                        return Game.gameArea.children[i];
                    }
                }
            }
        }
    }

    if(decisionMethod) return decisionMethod(targets, targeter);
};

/** Returns the closest target
  */
AI.closestTarget = function(targets, targeter) {
    if(targets.length == 1) return targets[0];

    var minDistance = MDF.distance(targets[0],targeter),
        minDistanceIndex = 0;

    for(var i = 1; i < targets.length; i++) {
        var distance = MDF.distance(targets[i],targeter);
        if(distance < minDistance) {
            minDistance = distance;
            minDistanceIndex = i;
        }
    }

    return targets[minDistanceIndex];
};

/** Returns a random target
  */
AI.randomTarget = function(targets) {
    return targets[Math.floor(Math.random()*targets.length)];
};