var GAMESTATES = {
    STOPPED: 0,
    LOADING: 1,
    LOADED:  2,
    STARTED: 3
};

var KEYS =  {
    LEFT:  0,
    RIGHT: 1
};

Game = function() {
  Stage = new createjs.Stage('mainCanvas');

  return {
    init: function()
      {Test();},
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
  };
}();

var Game, Stage, player, enemy, Swarm;

Test = function() {
  QUnit.start();
  module("Player");
  player = new Player();
  test("BaseHitpoints initialization", function() {
    equal(player.baseHitpoints, 100, "Player's BaseHitpoints are not equal to 100");
  });
  test("Faction", function() {
    equal(player.faction, Game.factions.humans, "Player does not belong to the 'humans' faction");
  });
  test("Damage taking", function() {
    player.takesDamage(20);
    equal(player.baseHitpoints, 80, "Taking 20 damage did not reduce Player's baseHitpoints to 80");
  });
  test("Death", function() {
    player.takesDamage(81);
    ok(player.baseHitpoints < 0, "Player is not dead");
  });
  
  module("Enemy");
  enemy = new Enemy();
  test("BaseHitpoints initialization", function() {
    equal(enemy.baseHitpoints, 100, "Enemy's BaseHitpoints are not equal to 100");
  });
  test("Faction", function() {
    equal(enemy.faction, Game.factions.aliens, "Enemy does not belong to the 'aliens' faction");
  });
  /*test("Basic enemy's death on single collision", function() {
    be = new BasicEnemy();
    be.collision({});
    ok(be.baseHitpoints < 0, "Basic enemy is not dead");
  });*/
  test("Flyship survives one hit", function() {
    fs = new Flyship();
    fs.collision({});
    ok(fs.baseHitpoints > 0, "Flyship died after one collision");
  });

  module("Swarm");
  shipsRow = 2;
  shipsCol = 3;
  swarm = new Swarm(-1,-1,shipsCol,shipsRow,0);
  /*test("Ships count by totalShips", function() {
    equal(swarm.totalShips, shipsCol * shipsRow, "Swarm's totalShips variable is not " + shipsRow * shipsCol);
  });
  test("Ships count by shipsArray size", function() {
    equal(swarm.shipsArray.length, shipsCol * shipsRow, "Swarm's shipsArray size is not " + shipsRow * shipsCol)
  });
  ship = swarm.shipsArray[0]
  current_total = swarm.totalShips
  test("Ship removal from swarm", function() {
  });*/
  /*test("Ships count by shipsArray size", function() {
    equal(swarm.shipsArray.length, shipsCol * shipsRow, "Swarm's shipsArray size is not " + shipsRow * shipsCol);
  });*/
  ship = swarm.shipsArray[0];
  current_total = swarm.totalShips;
  /*test("Ship removal from swarm", function() {
    ok(swarm.shipsArray.indexOf(ship) != -1, "Ship is currently not in swarm");
    ok(true, "Removing ship from swarm...");
    swarm.removeShip(ship)
    equal(swarm.totalShips, current_total -1, "Swarm's totalShips was not decremented by 1")
    ok(swarm.shipsArray.indexOf(ship) == -1, "Ship was removed not from swarm");
  });*/
};