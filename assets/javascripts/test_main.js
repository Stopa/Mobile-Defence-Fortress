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
      Player = new Player();
      test("BaseHitpoints initialization", function() {
        equal(Player.baseHitpoints, 100, "Player's BaseHitpoints are equal to 100");
      });
      test("Damage taking", function() {
        Player.takesDamage(20);
        equal(Player.baseHitpoints, 80, "Taking 20 damage reduced Player's baseHitpoints to 80");
      });
      // test("Player's death", function() {
      // Player.takesDamage(81);
      // equal(Player.parent.hasChild(Player), false, "Player's baseHitpoints were reduced to a negative value and player died");
      // });  ---  No idea how to check if player died
      test("Player's faction", function() {
        equal(Player.faction, Game.factions.humans, "Player belongs to the 'humans' faction");
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