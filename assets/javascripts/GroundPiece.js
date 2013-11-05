(function(window) {

    //The idea is to translate different HP levels to certain sprite frames using these
    //constants
    const Hp_Levels = {
        Full: 7,
        Higher: 6,
        High: 5,
        Medium: 4,
        Low: 3,
        Lower: 2,
        VeryLow: 1
    }
    function GroundPiece(imagePath, x, y) {
        this.initialize(imagePath, x, y);
    }
    GroundPiece.prototype = new Destructible();
    GroundPiece.prototype.destructibleInit = GroundPiece.prototype.initialize;

    GroundPiece.prototype.initialize = function(imagePath, x, y) {
        this.destructibleInit(7);
        this.faction =  Game.factions.humans;

        this.initSprite();
        this.width = 22;
        this.height = 22;
    };

    GroundPiece.prototype.collision = function(collisionWith) {
        this.baseHitpoints-=1;
        this.updateSprite();
    };

    GroundPiece.prototype.initSprite = function() {
         this.spriteSheet = new createjs.SpriteSheet({
             images: ['assets/images/level_0/Earth_tile.png'],
             frames: {width:22, height:22},
         });
        this.graphics = new createjs.Sprite(this.spriteSheet, 0);

         this.addChild(this.graphics);
    }

    GroundPiece.prototype.updateSprite = function() {
        switch (this.baseHitpoints) {
            case Hp_Levels.Full:
                this.graphics.gotoAndStop(0);
                break;
            case Hp_Levels.Higher:
                this.graphics.gotoAndStop(1);
                break;
            case Hp_Levels.High:
                this.graphics.gotoAndStop(2);
                break;
            case Hp_Levels.Medium:
                this.graphics.gotoAndStop(3);
                break;
            case Hp_Levels.Low:
                this.graphics.gotoAndStop(4);
                break;
            case Hp_Levels.Lower:
                this.graphics.gotoAndStop(5);
                break;
            case Hp_Levels.VeryLow:
                this.graphics.gotoAndStop(6);
                break;
        }
    }

    window.GroundPiece = GroundPiece;
}(window))