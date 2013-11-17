(function(window) {
    function Cannon() {
        this.initialize();
    }
    Cannon.prototype = new Weapon();
    Cannon.prototype.weaponInit = Cannon.prototype.initialize;
    Cannon.prototype.initialize = function() {
        this.weaponInit('', 50, 70);
    };

    Cannon.prototype._nextShotLeft = false; // whether the next shot will be fired from the left or right cannon
    Cannon.prototype.shoot = function() {
        if(this.cooldown <= 0) {
            var CANNON_BULLET_GRAPHICS = 'assets/images/player_ship/bullet.png';

            var realAngle = (this.rotation-90)*-1,
                angleSpeeds = MDF.angleSpeeds(realAngle),
                weaponAbsX = this.parent.x+this.x,
                weaponAbsY = this.parent.y+this.y,
                barrelPositionSpeeds = MDF.angleSpeeds(realAngle-90);


            var bullet = new Projectile(CANNON_BULLET_GRAPHICS,
                this.rotation, angleSpeeds.x*1.5, angleSpeeds.y*1.5,
                this.parent.faction,
                5, 5);
            /*
            * Bullet starting point is offset by the weapon length along the weapon rotation axis
            * and offset by 10 pixels by the perpendicular angle depending on which barrel we are currently using
            */
            bullet.x = weaponAbsX+angleSpeeds.x*(this.height)+barrelPositionSpeeds.x*5*(this._nextShotLeft?-1:1);
            bullet.y = weaponAbsY+angleSpeeds.y*(this.height)+barrelPositionSpeeds.y*5*(this._nextShotLeft?-1:1);
            Game.gameArea.addChild(bullet);
            this.playSound("cannon", 0.7);

            if(this._nextShotLeft) {
                this.weaponGraphics.gotoAndPlay('shootLeft');
                this.weaponFlameGraphics.gotoAndPlay('shootLeft');
            } else {
                this.weaponGraphics.gotoAndPlay('shootRight');
                this.weaponFlameGraphics.gotoAndPlay('shootRight');
            }

            this._nextShotLeft = !this._nextShotLeft;

            this.cooldown = this.attackSpeed;
        }
    };

    Cannon.prototype._initGraphics = function() {
        this.gunSpriteSheet = new createjs.SpriteSheet({
            framerate: 10,
            images: ['assets/images/player_ship/1a/1a_mdf_cannon_left.png'],
            frames: {
                width: 50,
                height: 70
            },
            animations: {
                shootLeft: [3,5,false],
                shootRight: [0,2,false],
                idle: 2
            }
        });
        this.gunFlameSpriteSheet = new createjs.SpriteSheet({
            images: ['assets/images/player_ship/1a/1a_mdf_cannon_left_flame.png'],
            frames: {
                width: 50,
                height: 70
            },
            animations: {
                shootLeft: [3,5,false],
                shootRight: [0,2,false],
                idle: 2
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
        this.regY = 63;
    };

    Cannon.prototype.attackSpeed = 14;

    window.Cannon = Cannon;
}(window))