//1
/*
var arrays = [[1, 2, 3], [4, 5], [6]];

var out = []; 
console.log(arrays.reduce(function(a,b){return a.concat(b)}))
*/

//2

var ANCESTRY_FILE = require('/home/legati/JS/eloquentJS/ancestry.js');
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

toCent = function(person) {
    return Math.ceil(person.died / 100)
}

var anc1 =JSON.parse(JSON.stringify(ancestry));

anc1.forEach(function(person){
    person['cent'] = toCent(person);
})

console.log(anc1)

output = {};

anc1.forEach(function(person){
    if (person.cent) output[person.cent] += 1;
    })

console.log(output)

output.forEach(function(el){output[el] = 0})

console.log(output)