(function(window) {
    function HUD() {
        this.initialize();
    }
    HUD.prototype = new createjs.Container();
    HUD.prototype.containerInit = HUD.prototype.initialize;
    HUD.prototype.containerTick = HUD.prototype._tick;

    HUD.prototype.initialize = function() {
        this.containerInit();
        this.hudHealthAndFPS = this._initGraphics();
        this.hudGameOver = this.gameOver();
    };
    HUD.prototype._tick = function() {
        this.containerTick();
        this.tickUpdateHUD();
    };

    HUD.prototype._initGraphics = function() {
        this.hitpointsString = "Health: " + window.PlayerFortress.getHitpoints();
        this.hitpointsHUDText = new createjs.Text(this.hitpointsString, "20px Arial", "#FFFFFF");
        this.hitpointsHUDText.textAlign = "center";
        this.hitpointsHUDText.x = 60;
        this.hitpointsHUDText.y = 10;
        this.addChild(this.hitpointsHUDText);

        return this.hitpointsHUDText;
    };

    HUD.prototype.tickUpdateHUD = function() {
        this.hitpointsString = "Health: " + window.PlayerFortress.getHitpoints();
        this.hitpointsString += "\n FPS: "+ Math.floor(createjs.Ticker.getMeasuredFPS());
        this.hudHealthAndFPS.text = this.hitpointsString;

        if (window.PlayerFortress.getHitpoints() <= 0) {
            this.hudGameOver.visible = true;
        }
    };

    HUD.prototype.gameOver = function() {
        this.gameOverString = "Game over, N00B!";
        this.gameOverHUDText = new createjs.Text(this.gameOverString, "50px Arial", "#FFFFFF");
        this.gameOverHUDText.textAlign = "center";
        this.gameOverHUDText.x = 1900/2;
        this.gameOverHUDText.y = 1080/2;
        this.gameOverHUDText.visible = false;
        this.addChild(this.gameOverHUDText);

        return this.gameOverHUDText;
    };

    HUD.prototype.hudHealthAndFPS = 0;
    HUD.prototype.hudGameOver = 0;

    window.HUD = HUD;
}(window));