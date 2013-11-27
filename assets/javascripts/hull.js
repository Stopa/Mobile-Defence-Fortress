(function(window) {
    function Hull(imagePath, width, height) {
        this.initialize(imagePath, width, height);
    }
    Hull.prototype = new createjs.Container();
    Hull.prototype.containerInit = Hull.prototype.initialize;
    Hull.prototype.initialize = function(imagePath, width, height) {
        this.containerInit();

        this.height = height;
        this.width = width;
        this.imagePath = imagePath;

        this._initGraphics();
    };

    Hull.prototype._initGraphics = function() {
        this.hullGraphics = new createjs.Bitmap(this.imagePath);
        this.addChild(this.hullGraphics);
    };

    window.Hull = Hull;
}(window));