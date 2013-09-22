(function(window) {
    function Player() {
        this.initialize();
    }
    Player.prototype = new createjs.Container();
    Player.prototype.s_init = Player.prototype.initialize;
    Player.prototype.s_tick = Player.prototype._tick;

    Player.prototype.initialize = function() {
        this.s_init();
        this._initGraphics();
    }
    Player.prototype._tick = function() {
        this.s_tick();
        this.tickMovement();
        this.tickWeaponRotation();
    }

    Player.prototype._initGraphics = function() {
        this.hull = new createjs.Shape();
        this.weapon = new createjs.Shape();

        this.hull.graphics.beginFill('blue').rect(0,0,100,50);
        this.weapon.graphics.beginFill('red').rect(-5,0,10,-50);
        this.weapon.x = 50;
        this.weapon.y = 0;

        this.addChild(this.hull);
        this.addChild(this.weapon);
    }
    Player.prototype.tickMovement = function() {
        switch(Game.movementKeyPressed) {
            case KEYS.LEFT:
                if(this.x > 0) {
                    this.x -= 10;
                }
            break;
            case KEYS.RIGHT:
                if(this.x < Stage.canvas.clientWidth-100) { // HARDCODE: hull width
                    this.x += 10;
                }
            break;
        }
    }
    Player.prototype.tickWeaponRotation = function() {
        var weaponAbsX = this.x+this.weapon.x,
            weaponAbsY = this.y+this.weapon.y,
            deltaX = Stage.mouseX-weaponAbsX,
            deltaY = Stage.mouseY-weaponAbsY,
            degrees = (Math.atan2(deltaY, deltaX)*180/Math.PI)+90;


        if(degrees < 90 && degrees > -90) {
            this.weapon.rotation = degrees;
        }
    }
    Player.prototype.fire = function() {
        var realAngle = (this.weapon.rotation-90)*-1,
            projectileDirectionX = Math.cos(realAngle*Math.PI/180),
            projectileDirectionY = -1*Math.sin(realAngle*Math.PI/180),
            weaponAbsX = this.x+this.weapon.x,
            weaponAbsY = this.y+this.weapon.y;

        var bullet = new Projectile(projectileDirectionX, projectileDirectionY);
        bullet.x = weaponAbsX+projectileDirectionX*(50); // HARDCODE: weapon length
        bullet.y = weaponAbsY+projectileDirectionY*(50); // HARDCODE: weapon length
        Stage.addChild(bullet);
    }

    window.Player = Player;
}(window));