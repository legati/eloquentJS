var ANCESTRY_FILE = require('C:/Users/Nik.Klymenko/Documents/test/ancestry.js');

var ancestry = JSON.parse(ANCESTRY_FILE);
console.log(ancestry.length);

/* function filter(array, test){
    var passed = [];
    var i = 0, len = array.length;
    for (i; i < len; i++) {
        if (test(array[i])) {
            passed.push(array[i]);
        }
    };
    return passed;
};
*/

function tester(person) {
    return person.born > 1900 && person.born < 1925;
};

console.log(ancestry.filter(tester));

function map(array, transform) {
    var mapped = [];
    var i = 0, len = array.length;
    for (i; i < len; i++) {
        mapped.push(transform(array[i]));
    };
    return mapped;
};

var overNinety = ancestry.filter(function(person){
    return person.died - person.born > 90;
});

//console.log(map(overNinety, function(person) {return person.name}));

console.log(overNinety.map(function(person){return person.name}))