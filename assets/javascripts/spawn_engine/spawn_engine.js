$(document).ready(function(){
	$('.spawn-engine').load('spawn_engine.html', function() {
		newWave();
		newSwarm(1);
	});
});

var waveCount = 0;
var swarmCount = 0;
var spawns = [];
var	spawnedSwarms = 0; 

function newWave() {
	waveCount++;
	var waveName = 'wave_' + waveCount,
		emSpace = '&emsp;',
		deleteWaveButton = '<button type="button" class="close" aria-hidden="true" onclick="deleteWave(' + waveCount + ')">&times;</button>',
		newSwarmButton = '<button type="button" class="btn btn-primary" onclick="newSwarm('+ waveCount +')">+ Add new Swarm</button>',
		$waveContainer = $('<div class="panel panel-info" id="'+ waveName +'"/>'),
		$waveHeader = $('<div class="panel-heading"/>'),
		$waveHeaderTitle = $('<p class="panel-title">' + waveName + emSpace + newSwarmButton + deleteWaveButton + '</p>'),
		$waveBody = $('<div class="panel-body"/>'),
		$waveBodyForm = $('<form class="form-inline" id="'+ waveName +'_swarm" role="form"/>');

	if (waveCount == 1) {
		$('.page-header').after($waveContainer);
	} else {
		$('#wave_' + (waveCount-1)).after($waveContainer);
	}
	$waveContainer.append($waveHeader);
	$waveHeader.append($waveHeaderTitle);
	$waveContainer.append($waveBody);
	$waveBody.append($waveBodyForm);
}

function deleteWave(waveNumber) {
	var waveId = '#wave_' + waveNumber;
	$(waveId).remove();
}

function newSwarm(waveNumber) {
	swarmCount++;

	var swarmContainerId = '#wave_' + waveNumber + '_swarm',
		swarmId = 'swarm_' + swarmCount;

	var $swarmContainer = $(swarmContainerId),
		$swarmBody = $('<form class="form-inline" role="form"/>');
	 
	$swarmBody.attr('id', swarmId);
	$swarmBody.load('assets/javascripts/spawn_engine/swarm.html', function(){
		$(this).append($('<button type="button" class="btn btn-danger" onclick="deleteSwarm(&#39;'+ swarmId +'&#39;)">Delete</button>'));
	});

	$swarmContainer.append($swarmBody);
}

function deleteSwarm(swarm) {
	var swarmId = '#' + swarm;
	$(swarmId).remove();
}

function spawnWaves() {
  swarmsArray = getWaves();

  for (var i = 0; i < swarmsArray.length; i++) {  
    var spawn = {
      x : 400,
      y : 400,
      ticksLeft: swarmsArray[i][1]*60 // Ticks per second = 60
    }

    spawns.push(spawn);
    spawnedSwarms++;
  }
}

function getWaves() {
  var swarmsArray = new Array();
  for (var i = 1; i <= swarmCount; i++) {
    var swarmType = '#swarm_' + i + ' .form-group:nth-child(1) option:selected';
    var swarmTimer = '#swarm_' + i + ' .form-group:nth-child(2) input';
    var swarm = [$(swarmType).text(), $(swarmTimer).val()];
    swarmsArray.push(swarm);
  }
  return swarmsArray;
}

function SpawnEngineTick() {
  if (spawns.length > 0) {
    for(var i = spawns.length; i > 0; i--) {
      if(spawns[i-1].ticksLeft <= 0) {
        var spawn = spawns[i-1];
        Game.gameArea.addChild(new FormationClassicF1(spawn.x, spawn.y));
        spawns.splice(i-1,1);
      } else {
        spawns[i-1].ticksLeft--;
      }
    }
  }
}