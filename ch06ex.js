/*
var Vector = function(x,y) {
    this.x = x; 
    this.y = y;
};

Vector.prototype.plus = function(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
};

Vector.prototype.minus = function(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
};

Object.defineProperty(Vector.prototype, 'length', {get: function() {return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));}})

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
*/

function repeat(string, times) {
    var result = '';
    for (var i = 0; i < times; i++) {
        result += string;
    }
    return result;
}

function TextCell(text) {
    this.text = text.split("\n");
}   
 TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line){
        return Math.max(width, line.length);
    },0)
};

TextCell.prototype.minHeight = function() {
    return this.text.length;
}

TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(line +repeat(" ", width - line.length));
    }
    return result;
}

var StretchCell = function(inner, width, height) {
    this.inner = inner;
    this.minWidth = function() {return Math.max(width, this.inner.minWidth())}
    this.minHeight = function() {return Math.max(height, this.inner.minHeight())}
}

StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height);
}

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]


// iterate() - sequence interface

var testObj = {1:1, 2:3, 3:5}

logFive = function(obj) {
    var count = Math.min(5, obj.length)
    console.log(obj.iterate(count))
}

Object.defineProperty(testObj, 'length', {enumerable: false, configurable: true, value: Object.keys(testObj).length})

iterate = function(array, n) {
    result = [];
    for (var i = 0; i <= n - 1; i++) {
        result.push(array[i])
    }
}