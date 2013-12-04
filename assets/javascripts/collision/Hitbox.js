(function(window) {
    function Hitbox(x, y, width, height, rotation) {
        this.initialize(x, y, width, height, rotation);
    }
    Hitbox.prototype.initialize = function(x, y, width, height, rotation) {

        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        if (rotation) this.rotation = rotation;


        var vectors = [];
        for (var i=1; i<5;i++){
            var vectorPoint = this.getLocPt(i);
            vectors.push(new SAT.Vector(vectorPoint.x, vectorPoint.y));
        }
        this.vectorBox = new SAT.Polygon(new SAT.Vector(this.x,this.y), vectors);

    };


    //Returns local coordinates of the corner of a rectangle, taking into account the rotation
    Hitbox.prototype.getLocPt = function(i){
        var dotX = 0;
        var dotY = 0;
        switch (i){
            case 1: //top-right corner
                dotX += this.width;
                break;
            case 2: //bottom-right corner
                dotX += this.width;
                dotY += this.height;
                break;
            case 3: //bottom-left corner
                dotY += this.height;
                break;
            case 4: //top-left corner
                break;
        }
        if (this.rotation === undefined || this.rotation === 0) {
            return new createjs.Point(dotX,dotY);
        } else {
            //return the transformation of the dot around this rects CENTER
            return new MDF.rotatePoint (dotX, dotY, this.rotation, 0.5*this.width, 0.5*this.height);
        }
    };

    Hitbox.prototype.drawCorners= function (){
        var cornerPt;
        for(var i = 0; i<4;i++){
            cornerPt = this.vectorBox.points[i];
            circle = new createjs.Shape();
            circle.graphics.beginFill("red").drawCircle(0, 0, 3);
            circle.x = this.vectorBox.pos.x + cornerPt.x;
            circle.y = this.vectorBox.pos.y + cornerPt.y;
            Game.gameArea.addChild(circle);
        }
};

    window.Hitbox = Hitbox;
}(window));