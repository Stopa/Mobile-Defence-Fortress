(function(window) {
    function HUD() {
        this.initialize();
    }
    HUD.prototype = new createjs.Container();
    HUD.prototype.containerInit = HUD.prototype.initialize;
    HUD.prototype.containerTick = HUD.prototype._tick;

    HUD.prototype.initialize = function() {
        this.containerInit();
        this.hudGraphics = this._initGraphics();
    }
    HUD.prototype._tick = function() {
        this.containerTick();
        this.tickUpdateHUD();
    }

    HUD.prototype._initGraphics = function() {
        this.hitpointsString = "Health: " + window.Player.getHitpoints(); 
        this.hitpointsHUDText = new createjs.Text(this.hitpointsString, "20px Arial", "#FFFFFF");
        this.hitpointsHUDText.textAlign = "center";
        this.hitpointsHUDText.x = 60;
        this.hitpointsHUDText.y = 10;
        this.addChild(this.hitpointsHUDText);

        return this.hitpointsHUDText;
    }

    HUD.prototype.tickUpdateHUD = function() {
        this.hitpointsString = "Health: " + window.Player.getHitpoints();
        this.hitpointsString += "\n FPS: "+ Math.floor(createjs.Ticker.getMeasuredFPS());
        this.hudGraphics.text = this.hitpointsString;
    }

    HUD.prototype.hudGraphics = 0;

    window.HUD = HUD;
}(window));