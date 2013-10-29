(function(window) {
    function Actor() {
        this.initialize();
    }
    Actor.prototype = new Destructible();
    Actor.prototype.destructibleInit = Actor.prototype.initialize;
    Actor.prototype.destructibleTick = Actor.prototype._tick;
    Actor.prototype.initialize = function() {
        this.destructibleInit();
    };
    Actor.prototype._tick = function() {
        this.destructibleTick();
    };

    window.Actor = Actor;
}(window))