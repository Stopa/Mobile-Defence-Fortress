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

Game = function() {
  Stage = new createjs.Stage('mainCanvas');

  return {
    init: function() 
      {Test()},
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

var Game, Stage, player, enemy, Swarm

Test = function() {
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
    ok(player.baseHitpoints < 0, "Player is dead");
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
  shipsRow = 2;
  shipsCol = 3;
  swarm = new Swarm(0,0,shipsCol,shipsRow,0);
  test("Ships count by totalShips", function() {
    equal(swarm.totalShips, shipsCol * shipsRow, "Swarm's totalShips variable is 6");
  });
  test("Ships count by shipsArray size", function() {
    equal(swarm.shipsArray.length, shipsCol * shipsRow, "Swarm's shipsArray size is 6")
  });
  ship = swarm.shipsArray[0]
  current_total = swarm.totalShips
  test("Ship removal from swarm", function() {
    ok(swarm.shipsArray.indexOf(ship) != -1, "Ship is currently in swarm");
    ok(true, "Removing ship from swarm...");
    swarm.removeShip(ship)
    equal(swarm.totalShips, current_total -1, "Swarm's totalShips was decremented by 1")
    ok(swarm.shipsArray.indexOf(ship) == -1, "Ship was removed from swarm");
  });
}