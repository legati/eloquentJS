//1
/*
var arrays = [[1, 2, 3], [4, 5], [6]];

var out = []; 
console.log(arrays.reduce(function(a,b){return a.concat(b)}))
*/

//2

var ANCESTRY_FILE = require('C:\\Users\\Nik.Klymenko\\Documents\\test\\eloquentJS\\ancestry.js');
var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
  }
  
  var byName = {};
  ancestry.forEach(function(person) {
    byName[person.name] = person;
  });

  
/* console.log(average(ancestry.filter(function(p){return byName[p.mother]}).map(function(person){
    return person.born - byName[person.mother].born;
    }))) */

//3

var age = function(person) {
    return person.died - person.born
}

var toCent = function(person) {
    return Math.ceil(person.died / 100)
}

var centuries = {}
var anc1 =JSON.parse(JSON.stringify(ancestry));

anc1.forEach(function(person){
    var currentCentury = toCent(person);
    //console.log(currentCentury + ' ' + age(person));
    //person['cent'] = currentCentury;
    if (!(currentCentury in centuries)) {
        centuries[currentCentury] = [];
    }
    centuries[currentCentury].push(age(person));
})

//console.log(anc1)
for (x in centuries) {
    console.log(average(centuries[x]));
    console.log('--------------')
}


/*output = {};

anc1.forEach(function(person){
    if (person.cent) output[person.cent] += 1;
    })

console.log(output)

output.forEach(function(el){output[el] = 0})

console.log(output)
*/
//4

/*
var every = function(array, test){
    var outcome = true;
    for (var i = 0; i < array.length; i++) {
        if ( !test(array[i]) ) {
            outcome = test(array[i]);
            break;
        };
    }
     return outcome;
}

var some = function(array, test) {
    var outcome = false;
    for (var i = 0; i < array.length; i++) {
        if ( test(array[i]) ) {
            outcome = test(array[i]);
            break
        }
    };
    return outcome;
};


console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false
*/