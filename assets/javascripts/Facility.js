(function(window) {
    function Facility(imagePath, x, y) {
        this.initialize(imagePath, x, y);
    }
    Facility.prototype = new Destructible();
    Facility.prototype.destructibleInit = Facility.prototype.initialize;

    Facility.prototype.initialize = function(imagePath, x, y) {
        this.destructibleInit();

        var facility = new createjs.Shape();
        facility.graphics.beginStroke("#00F");
        facility.graphics.beginFill("#00F")
        facility.snapToPixel = true;
        facility.graphics.drawRect(x, y, 80, 80);

        this.addChild(facility);
    };

    window.Facility = Facility
}(window))