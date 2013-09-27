(function(window) {
    function Destructible(hitPoints) {
        if(typeof hitPoints != 'undefined') {
            this.hitPoints = hitPoints;
        } else {
            this.hitPoints = 100;
        }
        this.initialize();
    }
    Destructible.prototype = new createjs.Container();
    Destructible.prototype.containerInit = Destructible.prototype.initialize;
    Destructible.prototype.containerTick = Destructible.prototype._tick;
    Destructible.prototype.initialize = function() {
        this.containerInit();
    };
    Destructible.prototype._tick = function() {
        this.containerTick();
        if(this.hitPoints <= 0) {
            this._die();
        }
    };
    Destructible.prototype._die = function() {
        Stage.removeChild(this);
    };
    Destructible.prototype.isOutOfParentBounds = function() {
        return this.x < 0 || this.y < 0 || 
                this.x > Stage.canvas.clientWidth || this.y > Stage.canvas.clientHeight;
    };

    window.Destructible = Destructible;
}(window))