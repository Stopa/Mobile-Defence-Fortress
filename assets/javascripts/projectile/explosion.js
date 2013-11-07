(function(window) {
  function Explosion(imagePath) {
    this.initialize(imagePath);
    alert('Initialized');
  };

  Explosion.prototype = new createjs.Container();
  Explosion.prototype.containerInit = Explosion.prototype.initialize;
  Explosion.prototype.containerTick = Explosion.prototype._tick;
  Explosion.prototype.initialize = function(imagePath) {
    this.containerInit();
    this._initExplosionGraphics(imagePath);
  };

  Explosion.prototype._tick = function() {
    //MDF.updateDebugRect(this);
    this.animateExplosion();
  }

  Explosion.prototype._initExplosionGraphics = function(imagePath) {
    this.explosionGraphics = new createjs.Bitmap(imagePath);
    this.explosionGraphics.x = 0;
    this.explosionGraphics.y = 0;
    this.explosionGraphics.scaleX = 0;
    this.explosionGraphics.scaleY = 0;
    this.addChild(this.explosionGraphics);
  };

  Explosion.prototype.animateExplosion = function() {
    if (this.explosionGraphics.scaleX < 2) {
      this.explosionGraphics.x -= 4.15;
      this.explosionGraphics.y -= 4.15;
      this.explosionGraphics.scaleX += 0.05;
      this.explosionGraphics.scaleY += 0.05;            
    }
  };

  Explosion.prototype.explosionGraphics = 0;

  window.Explosion = Explosion;
}(window))