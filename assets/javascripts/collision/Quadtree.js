/** http://gamedev.tutsplus.com/tutorials/implementation/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space/
*/

(function (window) {
    function QuadTree(level, bounds) {
        this.initialize(level, bounds);
    }
    QuadTree.prototype.initialize = function (level, bounds) {
        this.MAX_OBJECTS = 1;
        this.MAX_LEVELS = 5;

        this.level = level;
        this.bounds = bounds;
        this.objects = [];
        this.nodes = []; //subnodes


        MDF.createDebugRect(this.bounds, "#F00", Stage);
        MDF.updateDebugRect(this.bounds);

    };

    QuadTree.prototype._tick = function () {
    };

    /*
    * Clears the quadtree, removes debug rectangle
    */
    QuadTree.prototype.clear = function () {
        this.objects.length = 0; //clears the objects array

        for (var i=0; i < this.nodes.length; i++){
            if (this.nodes[i] !== undefined){
                Stage.removeChild(this.nodes[i].bounds.box);
                this.nodes[i].clear();
                this.nodes[i] = undefined;
            }
        }
    };

    /*
    * Splits the node into 4 subnodes
    */
    QuadTree.prototype.split = function () {
        var subWidth = this.bounds.width / 2;
        var subHeight = this.bounds.height / 2;
        var x = this.bounds.x;
        var y = this.bounds.y;

            this.nodes[0] = new QuadTree(this.level+1, new createjs.Rectangle(x + subWidth, y, subWidth, subHeight));
            this.nodes[1] = new QuadTree(this.level+1, new createjs.Rectangle(x, y, subWidth, subHeight));
            this.nodes[2] = new QuadTree(this.level+1, new createjs.Rectangle(x, y + subHeight, subWidth, subHeight));
            this.nodes[3] = new QuadTree(this.level+1, new createjs.Rectangle(x + subWidth, y + subHeight, subWidth, subHeight));
    };


    /*
    * Determine which node the object belongs to. -1 means
    * object cannot completely fit within a child node and is part
    * of the parent node
    */
    QuadTree.prototype.getIndex = function (object) {

        var objectPt = object.localToGlobal(0, 0); // transform the coordinates
        var index = -1;
        var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
        var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

    // Object can completely fit within the top quadrants
        var topQuadrant = (objectPt.y < horizontalMidpoint &&
            objectPt.y + object.height < horizontalMidpoint);
    // Object can completely fit within the bottom quadrants
        var bottomQuadrant = (objectPt.y > horizontalMidpoint);

    // Object can completely fit within the left quadrants
        if (objectPt.x < verticalMidpoint &&
            objectPt.x + object.width < verticalMidpoint) {
            if (topQuadrant) {
                index = 1;
            }
            else if (bottomQuadrant) {
                index = 2;
            }
        }
    // Object can completely fit within the right quadrants
        else if (objectPt.x > verticalMidpoint) {
            if (topQuadrant) {
                index = 0;
            }
            else if (bottomQuadrant) {
                index = 3;
            }
        }
        return index;
    };



    /*
     * Insert the object into the quadtree. If the node
     * exceeds the capacity, it will split and add all
     * objects to their corresponding nodes.
     */
    QuadTree.prototype.insert = function (pRect) {
        //if this quadtree node isnt partitioned, add it to the current nodes objects
        if (this.nodes[0] !== undefined){
            var index = this.getIndex(pRect);

            if (index != -1) {
                this.nodes[index].insert(pRect);
                return;
            }
        }

        this.objects.push(pRect);

        //If this node now contains more objects than allowed, split/partition it
        if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
            if (this.nodes[0] === undefined) {
                this.split();
            }

            var i = 0;
            while (i < this.objects.length){
                var index = this.getIndex(this.objects[i]);
                if (index != -1){
                    this.nodes[index].insert(this.objects.splice(i,1)[0]);
                }
                else {
                    i++;
                }
            }
        }
    };

    /*
    * Return all objects that could collide with the given object
    */
    QuadTree.prototype.retrieve = function(returnObjects, pRect) {
        var index = this.getIndex(pRect);
        if (index != -1 && this.nodes[0] !== undefined) {
            this.nodes[index].retrieve(returnObjects, pRect);
        }
        returnObjects.push.apply(returnObjects, this.objects); //add this nodes objects 
     
        return returnObjects;
    };

    

    window.QuadTree = QuadTree;
}(window))