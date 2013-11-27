(function(window) {
    function PointDefence() {
        this.initialize();
    }
    PointDefence.prototype = new Weapon();
    PointDefence.prototype.weaponInit = PointDefence.prototype.initialize;
    PointDefence.prototype.weaponTick = PointDefence.prototype._tick;
    PointDefence.prototype.initialize = function() {
        this.weaponInit('', 50, 70);
    };

    PointDefence.prototype._tick = function() {
        this.weaponTick();
                
        if(!this.currentTarget){ // find target if one is not present
            this.currentTarget = AI.findTarget(this, [Enemy]);
        } else {
            if(this.currentTarget.baseHitpoints <= 0) { // it's already dead!
                this.currentTarget = undefined;
                return; // i am so done
            }

            var globalPosition = this.parent.localToLocal(this.x,this.y,Game.gameArea),
                deltaX = this.currentTarget.x-globalPosition.x,
                deltaY = this.currentTarget.y-globalPosition.y,
                distance = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)); // no sense in using MDF.distance here as we need the deltas later anyway

            if(distance > this.range) { // the one that got away
                this.currentTarget = undefined;
                return;
            }

            var degrees = (Math.atan2(deltaY, deltaX)*180/Math.PI)+90,
                difference = degrees-this.rotation;
            
            if(Math.abs(this.rotation) < this.maxAngle)
                this.rotation += (Math.abs(difference) > this.rotationSpeed? this.rotationSpeed*(difference<0?-1:1) : difference);

            if(Math.abs(difference) < 10 && Math.abs(this.rotation) < this.maxShootingAngle) { // TODO - should try to get ahead of the enemy?
                this.shoot();
            }
        }
    };

    PointDefence.prototype._nextShotLeft = false; // whether the next shot will be fired from the left or right cannon
    PointDefence.prototype.shoot = function() {
        if(this.cooldown <= 0) {
            var CANNON_BULLET_GRAPHICS = 'assets/images/player_ship/bullet.png';

            var realAngle = (this.rotation-90)*-1,
                angleSpeeds = MDF.angleSpeeds(realAngle),
                weaponAbsX = this.parent.x+this.x,
                weaponAbsY = this.parent.y+this.y,
                barrelPositionSpeeds = MDF.angleSpeeds(realAngle-90);


            var bullet = new Projectile(CANNON_BULLET_GRAPHICS,
                this.rotation, angleSpeeds.x*2, angleSpeeds.y*2,
                this.parent.faction,
                5, 5);
            bullet.baseDamage = 10;
            /*
            * Bullet starting point is offset by the weapon length along the weapon rotation axis
            * and offset by 10 pixels by the perpendicular angle depending on which barrel we are currently using
            */
            bullet.x = weaponAbsX+angleSpeeds.x*(this.height)+barrelPositionSpeeds.x*5*(this._nextShotLeft?-1:1);
            bullet.y = weaponAbsY+angleSpeeds.y*(this.height)+barrelPositionSpeeds.y*5*(this._nextShotLeft?-1:1);
            Game.gameArea.addChild(bullet);
            this.playSound("turret_shoot", 0.7);

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

    PointDefence.prototype._initGraphics = function() {
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

    PointDefence.prototype.attackSpeed = 45;
    PointDefence.prototype.rotationSpeed = 0.2;
    PointDefence.prototype.range = 1000;
    PointDefence.prototype.isAutomatic = true;
    // maximum angle at which the point defence turret will shoot
    PointDefence.prototype.maxShootingAngle = 30;

    window.PointDefence = PointDefence;
}(window));