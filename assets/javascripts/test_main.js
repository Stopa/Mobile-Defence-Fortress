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

var Game, Player, Enemy

Game = function() {
  return {
    init: function() {
      module("Player")
      Player = new Player();
      test("BaseHitpoints initialization", function() {
        equal(Player.baseHitpoints, 100, "Player's BaseHitpoints are equal to 100");
      });
      test("Faction", function() {
        equal(Player.faction, Game.factions.humans, "Player belongs to the 'humans' faction");
      });
      test("Damage taking", function() {
        Player.takesDamage(20);
        equal(Player.baseHitpoints, 80, "Taking 20 damage reduced Player's baseHitpoints to 80");
      });
      test("Player's death", function() {
      Player.takesDamage(81);
      ok(Player.baseHitpoints < 0, "Player is dead");
      });
      
      module("Enemy");
      Enemy = new Enemy();
      test("BaseHitpoints initialization", function() {
        equal(Enemy.baseHitpoints, 100, "Enemy's BaseHitpoints are equal to 100");
      });
      test("Faction", function() {
        equal(Enemy.faction, Game.factions.aliens, "Enemy belongs to the 'aliens' faction");
      });
      test("Death on single collision", function() {
        Enemy.collision({});
        ok(Enemy.baseHitpoints < 0, "Enemy is dead")
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