(function(window) {
    function BasicHull() {
        this.initialize();
    }
    BasicHull.prototype = new Hull();
    BasicHull.prototype.hullInit = BasicHull.prototype.initialize;
    BasicHull.prototype.initialize = function() {
        this.hullInit('assets/images/player_ship/player_ship.png', 59, 43);
    };
    
    window.BasicHull = BasicHull;
}(window))