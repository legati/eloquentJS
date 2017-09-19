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

    