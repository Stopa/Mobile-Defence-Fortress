const GAMESTATES = {
    STOPPED: 0,
    LOADING: 1,
    LOADED:  2,
    STARTED: 3
}

const KEYS =  {
    LEFT:  0,
    RIGHT: 1
}

var Game, Player

Game = function() {
    return {
        init: function() {
          module("Player")
          test("Player baseHitpoints initialization without arguments", function() {
            Player = new Player();
            equal(Player.baseHitpoints, 100, "Player's baseHitpoints are equal to 100 on argumentless initialization");
          });
        },
        controls: {
            movementKeyPressed: undefined,
            leftMouseDown: false,
            rightMouseDown: false
        },
        factions: {
            humans: 0,
            aliens: 1
        },
        colliders : [],
        debug : false,
        canvasWidth : 100
    }
}();