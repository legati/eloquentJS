var invoke = function(object) {console.log(object.sound(object.present()))}

var eagle1 = {};
var squeak = function(line) {return "I am " + this.type + " Ooooeeeeee...." + line}
var tellName = function() {return this.name};
eagle1.sound = squeak;
eagle1.present = tellName;
eagle1.name = 'Don Juan';
eagle1.type = 'green';

var yelp = function(line) {return 'Ehhhh....' + this.type + ' ' + line}

var eagle2 = {}

eagle2.type = 'Awesome';
eagle2.name = "Borrucio"
eagle2.sound = yelp;
eagle2.present = tellName;

//invoke(eagle2);

console.log(yelp.apply(eagle1, ['A']))


