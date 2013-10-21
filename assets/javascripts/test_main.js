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

var Game, Stage, player, enemy, Swarm

Game = function() {
  Stage = new createjs.Stage('mainCanvas');

  return {
    init: function() {
      module("Player")
      player = new Player();
      test("BaseHitpoints initialization", function() {
        equal(player.baseHitpoints, 100, "Player's BaseHitpoints are equal to 100");
      });
      test("Faction", function() {
        equal(player.faction, Game.factions.humans, "Player belongs to the 'humans' faction");
      });
      test("Damage taking", function() {
        player.takesDamage(20);
        equal(player.baseHitpoints, 80, "Taking 20 damage reduced Player's baseHitpoints to 80");
      });
      test("Death", function() {
        player.takesDamage(81);
        equal(Stage.children.indexOf(player), -1, "Player is dead");
      });
      
      module("Enemy");
      enemy = new Enemy();
      test("BaseHitpoints initialization", function() {
        equal(enemy.baseHitpoints, 100, "Enemy's BaseHitpoints are equal to 100");
      });
      test("Faction", function() {
        equal(enemy.faction, Game.factions.aliens, "Enemy belongs to the 'aliens' faction");
      });
      test("Death on single collision", function() {
        enemy.collision({});
        ok(enemy.baseHitpoints < 0, "Enemy is dead")
      });

      module("Swarm");
      swarm = new Swarm(0,0,2,3,0);
      test("Ships count by totalShips", function() {
        equal(swarm.totalShips, 2 * 3, "Swarm's totalShips variable is 6");
      });
      test("Ships count by array size", function() {
        equal(swarm.shipsArray.length, 2 * 3, "Swarm's shipsArray size is 6")
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