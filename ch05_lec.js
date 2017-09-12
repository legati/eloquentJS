var ANCESTRY_FILE = require('/home/legati/JS/eloquentJS/ancestry.js');

var ancestry = JSON.parse(ANCESTRY_FILE);
//console.log(ancestry.length);

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

//console.log(ancestry.filter(tester));

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

//console.log(overNinety.map(function(person){return person.name}))

var byName = {};

ancestry.forEach(function(p){
    byName[p.name] = p;
});

var ph = byName['Philibert Haverbeke'];

console.log(ph);

function reduceAncestors(person, f, defVal) {
    function valueFor(p) {
        if (p == null) return defVal;
        else {
            return f(p, valueFor(byName[p.father]), valueFor(byName[p.mother]));
        };
    };
    return valueFor(person);
};

function sharedDNA(person, fromMother, fromFather){
    if (person.name == 'Pauwels van Haverbeke')
        return 1;
    else
        return (fromMother + fromFather) / 2;
};

console.log(reduceAncestors(ph, sharedDNA, 0) / 4);

function age(p) {return (p.died - p.born)};

function countAncestors (person, test) {
    function combine(current, fromMother, fromFather){
        var thisOneCounts = ((current != person) && (test(current)))?1:0;
        return fromMother+fromFather+thisOneCounts;
    }
    return reduceAncestors(person, combine, 0)
}

function longLivingPercentage(person){
    var longLive, all;
    longLive = countAncestors(person, function(person) {return age(person) >= 70});
    all = countAncestors(person, function(){return true});
    return longLive / all;
}

console.log(longLivingPercentage(byName['Emile Haverbeke']))

var theSet = ["Carel Haverbeke", "Maria van Brussel",
"Donald Duck"];

function isInSet(set, person) {
    return set.indexOf(person.name) > -1;
}

//console.log(ancestry.filter(function(person){return isInSet(theSet, person)}));

//console.log(ancestry.filter(isInSet.bind(null, theSet)));

console.log(ancestry.filter(isInSet.bind(null, theSet)))