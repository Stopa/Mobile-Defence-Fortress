(function(window) {
    function BasicHull() {
        this.initialize();
    }
    BasicHull.prototype = new Hull();
    BasicHull.prototype.hullInit = BasicHull.prototype.initialize;
    BasicHull.prototype.hullTick = BasicHull.prototype._tick;
    BasicHull.prototype.initialize = function() {
        this.hullInit('', 122, 80);

        this.on('moveLeft', this._handleMoveLeft);
        this.on('moveRight', this._handleMoveRight);
    };
    BasicHull.prototype._tick = function() {
        this.hullTick();
        if(Game.controls.movementKeyPressed == KEYS.LEFT && !this.rightJetLight.visible) {
            this.rightJetLight.visible = true;
            this.leftJetLight.visible = false;
        } else if(Game.controls.movementKeyPressed == KEYS.RIGHT && !this.leftJetLight.visible) {
            this.leftJetLight.visible = true;
            this.rightJetLight.visible = false;
        } else {
            this.leftJetLight.visible = this.rightJetLight.visible = false;
        }
    };

    BasicHull.prototype._initGraphics = function() {
        var mdfBody = queue.getResult('mdfBody');
        this.body = new createjs.Bitmap(mdfBody);
        this.body.x = 0;
        this.body.y = 0;
        this.addChild(this.body);

        var mdfJetFlameDown = queue.getResult('mdfJetFlameDown');
        this.engineFlames = new createjs.Bitmap(mdfJetFlameDown);
        this.engineFlames.compositeOperation = 'lighten';
        this.engineFlames.x = 0;
        this.engineFlames.y = 78;
        this.addChild(this.engineFlames);

        var mdfJetFlameLeft = queue.getResult('mdfJetFlameLeft');
        this.leftJetLight = new createjs.Bitmap(mdfJetFlameLeft);
        this.leftJetLight.compositeOperation = 'lighten';
        this.leftJetLight.visible = false;
        this.leftJetLight.x = -33;
        this.leftJetLight.y = 47;
        this.addChild(this.leftJetLight);

        var mdfJetFlameRight = queue.getResult('mdfJetFlameRight');
        this.rightJetLight = new createjs.Bitmap(mdfJetFlameRight);
        this.rightJetLight.compositeOperation = 'lighten';
        this.rightJetLight.visible = false;
        this.rightJetLight.x = 121;
        this.rightJetLight.y = 47;
        this.addChild(this.rightJetLight);
    };

    BasicHull.prototype._handleMoveLeft = function() {
        this.rightJetLight.visible = true;
    };
    BasicHull.prototype._handleMoveRight = function() {
        this.leftJetLight.visible = true;
    };
    
    window.BasicHull = BasicHull;
}(window));