(function(window) {
    function Destructible(baseHitpoints) {
        this.initialize();
    }
    Destructible.prototype = new createjs.Container();
    Destructible.prototype.containerInit = Destructible.prototype.initialize;
    Destructible.prototype.containerTick = Destructible.prototype._tick;

    Destructible.prototype.initialize = function(baseHitpoints) {
        this.containerInit();
        if(typeof baseHitpoints != 'undefined') {
            this.baseHitpoints = baseHitpoints;
        } else {
            this.baseHitpoints = 100;
        }
    };

    Destructible.prototype._tick = function() {
        this.containerTick();
        if(this.baseHitpoints <= 0) {
            this._die();
        }
    };

    Destructible.prototype._die = function() {
        if (Game.debug) Game.gameArea.removeChild(this.box);    //remove debug rectangle
        this.parent.removeChild(this);
    };

    Destructible.prototype.isOutOfParentBounds = function() {
        return this.x < 0 || this.y < 0 || 
                this.x > Game.transformedSize.x || this.y > Game.transformedSize.y;
    };

    Destructible.prototype.takesDamage = function(damageAmount) {
        this.baseHitpoints = this.baseHitpoints - damageAmount;
    }

    window.Destructible = Destructible;
}(window))