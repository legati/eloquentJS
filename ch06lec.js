/*
var invoke = function(object) {console.log(object.sound(object.present()))}

var eagle1 = {};
var squeak = function(line) {console.log("I am " + this.type + " Ooooeeeeee...." + line)}
var tellName = function() {return this.name};
eagle1.sound = squeak;
eagle1.present = tellName;
eagle1.name = 'Don Juan';
eagle1.type = 'green';

var yelp = function(line) {console.log('Ehhhh....' + this.type + ' ' + line)}

var eagle2 = {}

eagle2.type = 'Awesome';
eagle2.name = "Borrucio"
eagle2.sound = yelp;
eagle2.present = tellName;

//invoke(eagle2);

//console.log(yelp.apply(eagle1, ['A']))

var protoAnimal = {sound: squeak};

var newEagle = Object.create(protoAnimal);
newEagle.type = 'Elegant';
//newEagle.sound('Keeeee');

function Eagle(type) {this.type = type};

var redEagle = new Eagle('red');
redEagle.sound = yelp;
//redEagle.sound('');

Eagle.prototype.length = 17;

//console.log(redEagle.length);

redEagle.length = 21;

//console.log(redEagle.length);

Object.defineProperty(Eagle.prototype, 'noSeen', {enumerable:true, value: 'A'})
for (var prop in redEagle) {
    console.log(prop);
}
console.log('\n')
console.log(redEagle.hasOwnProperty('noSeen'))
console.log('\n')

for (var prop in redEagle) {
    if (redEagle.hasOwnProperty(prop)) console.log(prop);
}

var null0 = Object.create(null);

for (var prop in null0) {
    console.log(prop);
}
*/

function rowHeights(rows) {
    return rows.map(function(row){
        return row.reduce(function(max, cell){
            return Math.max(max, cell.minHeight())
        }, 0);
    });
}

function colWidths(rows) {
    return rows[0].map(function(_, i) {
        return rows.reduce(function(max, row){
            return Math.max(max, row[i].minWidth())
        }, 0)
    }
    )}

    function drawTable(rows) {
        var heights = rowHeights(rows);
        var widths = colWidths(rows);

        function drawLine(blocks, lineNo) {
            return blocks.map(function(block){
                return block[lineNo];
            }).join(" ");
        }

        function drawRow(row, rowNum) {
            var blocks = row.map(function(cell, colNum) {
                return cell.draw(widths[colNum], heights[rowNum]);
            });
            return blocks[0].map(function(_, lineNo){
                return drawLine(blocks, lineNo);
            }).join("\n");
        }

        return rows.map(drawRow).join("\n")
    }


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

/*
var rows = [];
for (var i = 0; i < 5; i++) {
    var row = [];
    for (var j = 0; j < 5; j++){
        if ( (j+i)%2 == 0 ) {
            row.push(new TextCell('##'));
        }
        else {
            row.push(new TextCell('  '));
        }
    }
    console.log(row);
    rows.push(row);
}

console.log(rows);
console.log(drawTable(rows));
*/

var MOUNTAINS_FILE = require('C:\\Users\\Nik.Klymenko\\Documents\\test\\eloquentJS\\mountains.js');

//var mountains = JSON.parse(MOUNTAINS_FILE);

function UnderlinedCell(inner) {
    this.inner = inner;
}

UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
}

UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight() + 1;
}

UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
}

/* function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name){
        return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function(row){
        return keys.map(function(name){
            return new TextCell(String(row[name]));
        });
    });
    return [headers].concat(body);
} */


/*
var pile = {
    elements: ["eggshell", "orange peel", "worm"],
    get height() {
         return this.elements.length;
        },
    set height(value) {
        console.log("Ignoring attempt to set height to", value);
    }
};

console.log(pile.height);

pile.height = 10;
*/

/*
Object.defineProperty(TextCell.prototype, "heightProp", {
    get: function() {return this.text.length}
})

var cell = new TextCell('no\nway');
console.log(cell.heightProp);
*/

function RTextCell(text) {
    TextCell.call(this, text);
}

RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || '';
        result.push(repeat(" ", width - line.length) + line);
    }
    return result;
}

function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name){
        return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function(row){
        return keys.map(function(name){
            if (typeof row[name]=='number') {
                return new RTextCell(String(row[name]));
            }
            else {
                return new TextCell(String(row[name]));
            }
        });
    });
    return [headers].concat(body);
}

//console.log(drawTable(dataTable(MOUNTAINS_FILE)))

console.log(new TextCell('A') instanceof RTextCell)