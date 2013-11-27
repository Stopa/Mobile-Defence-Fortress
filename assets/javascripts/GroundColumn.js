(function(window) {

    //The idea is to translate different HP levels to certain tile images using these
    //constants
    var damageStates = {
        dmgState0: 7,    // 0dmgState art displayed when hp is 7 (full)
        dmgState1: 6,    // etc
        dmgState2: 5,
        dmgState3: 4,
        dmgState4: 3,
        dmgState5: 2,
        dmgState6: 1
    };
    function GroundColumn(imagePath, x, y) {
        this.initialize(imagePath, x, y);
    }
    GroundColumn.prototype = new createjs.Shape();
    GroundColumn.prototype.shapeInit = GroundColumn.prototype.initialize;

    GroundColumn.prototype.initialize = function(imagePath, x, y) {
        this.shapeInit();
        this.faction =  Game.factions.humans;

        this.width = 22;
        this.height = 286; // 13*22
        this.topTileDamageState = damageStates.dmgState0;
        this.initSprite();
    };

    GroundColumn.prototype.collision = function(collisionWith) {
    };

    GroundColumn.prototype.takesDamage = function(damage) {
        this.topTileDamageState -= damage;
        this.updateSprite();
    };

    GroundColumn.prototype.initSprite = function() {
        this.snapToPixel = true;
        this.graphics.beginBitmapFill(queue.getResult('dmgState0'), 'repeat-y').drawRect(0,0,this.width,this.height);
        this.cache(0,0,this.width,this.height);
    };

    GroundColumn.prototype.updateSprite = function() {
        if(this.topTileDamageState < damageStates.dmgState6) {
            this.height -= 22;
            this.y += 22;
            this.topTileDamageState = damageStates.dmgState0;
        }
        this.graphics.clear();
        this.graphics.beginBitmapFill(queue.getResult('dmgState0'),
            'repeat-y').drawRect(0, 22, this.width, this.height-22);

        this.graphics.beginBitmapFill(queue.getResult(this.getBitmapPath(this.topTileDamageState)),
            'no-repeat').drawRect(0, 0, 22, 22);
        this.updateCache();
    };

    /** Get suiting image path according to current hp*/
    GroundColumn.prototype.getBitmapPath = function(currentDamageState){
        var filename = null;
        switch (currentDamageState){
            case damageStates.dmgState0:
                filename = 'dmgState0';
            break;
            case damageStates.dmgState1:
                filename = 'dmgState1';
            break;
            case damageStates.dmgState2:
                filename = 'dmgState2';
            break;
            case damageStates.dmgState3:
                filename = 'dmgState3';
            break;
            case damageStates.dmgState4:
                filename = 'dmgState4';
            break;
            case damageStates.dmgState5:
                filename = 'dmgState5';
            break;
            case damageStates.dmgState6:
                filename = 'dmgState6';
            break;
        }
        return filename;
    };

    window.GroundColumn = GroundColumn;
}(window));