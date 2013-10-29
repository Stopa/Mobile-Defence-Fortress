(function(window) {
    function GroundPiece(imagePath, x, y) {
        this.initialize(imagePath, x, y);
    }
    GroundPiece.prototype = new Destructible();
    GroundPiece.prototype.destructibleInit = GroundPiece.prototype.initialize;

    GroundPiece.prototype.initialize = function(imagePath, x, y) {
        this.destructibleInit();

        var ground_piece = new createjs.Shape();
        ground_piece.graphics.beginStroke("#000");
        ground_piece.graphics.beginFill("#999")
        ground_piece.snapToPixel = true;
        ground_piece.graphics.drawRect(0,0, 40, 40);

        this.faction =  Game.factions.humans;

        this.addChild(ground_piece);
    };

    GroundPiece.prototype.collision = function(collisionWith) {
        this._die();
    };

    window.GroundPiece = GroundPiece
}(window))