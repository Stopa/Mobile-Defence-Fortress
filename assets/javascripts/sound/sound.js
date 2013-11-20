function initSounds() {
  // if initializeDefaultPlugins returns false, we cannot play sound in this browser
  if (!createjs.Sound.initializeDefaultPlugins()) {return;}
  var audioPath = "assets/sounds/";
  var manifest = [
    {id:"enemy_shoot", src:audioPath+"enemy/enemy_shoot.wav"},
    {id:"cannon", src:audioPath+"player_ship/cannon.wav"},
    {id:"turret_shoot", src:audioPath"turret/turret_shoot.wav"}
  ];
   
  createjs.Sound.addEventListener("loadComplete", handleLoadSound);
  createjs.Sound.registerManifest(manifest);
}
 
function handleLoadSound(event) {
  var instance = createjs.Sound.play(event.src);
  instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
  instance.volume = 0.7;
}