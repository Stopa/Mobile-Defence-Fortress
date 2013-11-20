var AI = {};


/** Finds the first object in gameArea.children array which matches any of the
  *  provided targetTypes and is within range of targeter, returns it.
  */
AI.findTarget = function(targeter, targetTypes) {
        var globalPosition = targeter.parent.localToLocal(targeter.x,targeter.y,Game.gameArea);

        for(var i = 0; i < Game.gameArea.children.length; i++) { // TODO - can be done more efficiently, e.g. with collision?
            for(var j = 0; j<targetTypes.length; j++) {
                if(Game.gameArea.children[i].faction !== targeter.faction &&
                    Game.gameArea.children[i] instanceof targetTypes[j]) {
                    var deltaX = Game.gameArea.children[i].x-globalPosition.x,
                        deltaY = Game.gameArea.children[i].y-globalPosition.y,
                        distance = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));

                    if(!targeter.range || distance < targeter.range) { // TODO - should choose the closest target instead of a random one?
                        return Game.gameArea.children[i];
                    }
                }
            }
        }
    };