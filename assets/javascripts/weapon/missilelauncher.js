(function(window) {
    function MissileLauncher() {
        this.initialize();
    }
    MissileLauncher.prototype = new Weapon();
    MissileLauncher.prototype.weaponInit = MissileLauncher.prototype.initialize;
    MissileLauncher.prototype.initialize = function() {
        this.weaponInit('', 51, 99);
    };

    MissileLauncher.prototype.shoot = function() {
        if(this.cooldown <= 0) {

            var realAngle = (this.rotation-90)*-1,
                angleSpeeds = MDF.angleSpeeds(realAngle),
                weaponAbs = this.parent.localToLocal(this.x,this.y,Game.gameArea),
                mousePosition = Game.gameArea.globalToLocal(Stage.mouseX,Stage.mouseY);

            var mouseDistance = Math.sqrt(Math.pow(mousePosition.x-weaponAbs.x, 2)+Math.pow(mousePosition.y-weaponAbs.y, 2)),
                xtarget = weaponAbs.x+angleSpeeds.x*mouseDistance,
                ytarget = weaponAbs.y+angleSpeeds.y*mouseDistance;

            // CANT USE THAT, need to only use allowed mouse positions
            var bullet = new this.missile(this.rotation, angleSpeeds.x, angleSpeeds.y, xtarget, ytarget, this.parent.faction);
            /*
            * Bullet starting point is offset by the weapon length along the weapon rotation axis
            * and offset by 10 pixels by the perpendicular angle depending on which barrel we are currently using
            */
            bullet.x = weaponAbs.x+angleSpeeds.x*(this.height);
            bullet.y = weaponAbs.y+angleSpeeds.y*(this.height);
            Game.gameArea.addChild(bullet);

            this.weaponGraphics.gotoAndPlay('shoot');
            this.weaponFlameGraphics.gotoAndPlay('shoot');

            this.cooldown = this.attackSpeed;
        }
    };

    MissileLauncher.prototype._initGraphics = function() {
        this.gunSpriteSheet = new createjs.SpriteSheet({
            images: ['assets/images/player_ship/1a/1a_mdf_cannon_right.png'],
            frames: {
                width: 51,
                height: 99
            },
            animations: {
                shoot: [0,2,false],
                idle: 3
            }
        });
        this.gunFlameSpriteSheet = new createjs.SpriteSheet({
            images: ['assets/images/player_ship/1a/1a_mdf_cannon_right_flame.png'],
            frames: {
                width: 51,
                height: 99
            },
            animations: {
                shoot: [0,3,false],
                idle: 3
            }
        });

        this.weaponGraphics = new createjs.Sprite(this.gunSpriteSheet, 'idle');
        this.weaponGraphics.x = -1*this.width/2;
        this.addChild(this.weaponGraphics);

        this.weaponFlameGraphics = new createjs.Sprite(this.gunFlameSpriteSheet, 'idle');
        this.weaponFlameGraphics.compositeOperation = 'lighter';
        this.weaponFlameGraphics.x = -1*this.width/2;
        this.addChild(this.weaponFlameGraphics);

        this.regX = 0;
        this.regY = 97;
    };

    MissileLauncher.prototype.attackSpeed = 600;
    MissileLauncher.prototype.missile = Missile;

    window.MissileLauncher = MissileLauncher;
}(window));