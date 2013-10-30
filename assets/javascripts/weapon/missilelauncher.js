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
                weaponAbsX = this.parent.x+this.x,
                weaponAbsY = this.parent.y+this.y;

            var mouseDistance = Math.sqrt(Math.pow(Stage.mouseX-weaponAbsX, 2)+Math.pow(Stage.mouseY-weaponAbsY, 2));
            // CANT USE THAT, need to only use allowed mouse positions
            var bullet = new this.missile(this.rotation, angleSpeeds.x, angleSpeeds.y, weaponAbsX+angleSpeeds.x*mouseDistance, weaponAbsY+angleSpeeds.y*mouseDistance, this.parent.faction);
            /*
            * Bullet starting point is offset by the weapon length along the weapon rotation axis
            * and offset by 10 pixels by the perpendicular angle depending on which barrel we are currently using
            */
            bullet.x = weaponAbsX+angleSpeeds.x*(this.height);
            bullet.y = weaponAbsY+angleSpeeds.y*(this.height);
            Stage.addChild(bullet);

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
        this.gumFlameSpriteSheet = new createjs.SpriteSheet({
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

        this.weaponFlameGraphics = new createjs.Sprite(this.gumFlameSpriteSheet, 'idle');
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