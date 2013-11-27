(function(window) {
  function Explosion(imagePath,x,y,maxScale) {
    this.initialize(imagePath,x,y,maxScale);
  }

  Explosion.prototype = new createjs.Container();
  Explosion.prototype.containerInit = Explosion.prototype.initialize;
  Explosion.prototype.containerTick = Explosion.prototype._tick;
  Explosion.prototype.initialize = function(imagePath,x,y,maxScale) {
    this.containerInit();
    this._initExplosionGraphics(imagePath);
    this.maxScale = maxScale || 1;
    this.height = 166; // HARDCODE
    this.width = 166; // HARDCODE
    this.x = x-166/2; // HARDCODE
    this.y = y-166/2; // HARDCODE
  };

  Explosion.prototype._tick = function() {
    this.animateExplosion();
    MDF.updateDebugRect(this,'green');
  };

  Explosion.prototype._initExplosionGraphics = function(imagePath) {
    this.explosionGraphics = new createjs.Bitmap(imagePath);
    this.explosionGraphics.x = 166/2; // HARDCODE
    this.explosionGraphics.y = 166/2; // HARDCODE
    this.explosionGraphics.scaleX = 0;
    this.explosionGraphics.scaleY = 0;
    this.addChild(this.explosionGraphics);
  };

  Explosion.prototype.animateExplosion = function() {
    if (this.explosionGraphics.scaleX < this.maxScale) {
      this.explosionGraphics.x -= 4.15;
      this.explosionGraphics.y -= 4.15;
      this.explosionGraphics.scaleX += 0.05;
      this.explosionGraphics.scaleY += 0.05;
    } else {
      Game.gameArea.removeChild(this);
    }
  };

  Explosion.prototype.explosionGraphics = 0;

  window.Explosion = Explosion;
}(window));