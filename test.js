var JOURNAL = require('C:/Users/Nik.Klymenko/Documents/test/jacques_journal.js');

// forEach(myArray, function(value){
// console.log(Boolean(value));
// });

// myArray.forEach(function(element) {console.log(Boolean(element))})

// var journal = [];

// function addEntry(events, mutation) {
//     journal.push({
//         events: events,
//         mut: mutation 
//     });
// };


function step(stringBin) {
    var firstDigit = parseInt(stringBin.charAt(0)), lastDigit = parseInt(stringBin.charAt(1));
    return ('' + lastDigit + (firstDigit + 1)%2);
};

function dec2binStr(dec, length) {
    var bin = dec.toString(2);
    while (bin.length < length){
        bin = '0' + bin;
    }
    return bin;
}

function calcTable2x2(table) {
    var a = 0, len = table.length;
    var outTable = [];
    for (a; a < len; a++) {
        var ind1 = a;
        var ind2 = parseInt(step(dec2binStr(a,2)),2);
        outTable.push(table[ind1] + table[ind2]);
    };
    return outTable;
};


function countPhi(table) {
    var phi = (table[3]*table[0] - table[2]*table[1])/Math.sqrt((table[2] + table[3])*
                                                                (table[0] + table[1])*
                                                                (table[1] + table[3])*
                                                                (table[0] + table[2])
    );
    //console.log(phi);
    return phi;
};

var myArray2 = [99, 21, 7, 102]

//countPhi(myArray2);

function hasEvent(event, entry) {
    return entry.events.indexOf(event) != -1;
} 

function tableFor(event, journal) {
    var table = [0,0,0,0];
    var len = journal.length;
    for (var i = 0; i < len; i++){
        var entry = journal[i], index = 0;
        if (hasEvent(event, entry)) {index += 1};
        if (entry.squirrel) index += 2;
        table[index] += 1;
    };
    return table;
};

function gatherCorrelations(journal){
    var phis = {};
    var entry = 0, jlen = journal.length;
    for (entry; entry < jlen; entry++){
        var events = journal[entry].events;
        var i = 0, evlen = events.length;
        for (i; i < evlen; i++){
            var event = events[i];
            if (!(event in phis)) {
                phis[event] = countPhi(tableFor(event, journal))
            }
        }
    }
    return phis;
}

var corrs = gatherCorrelations(JOURNAL);


for (var corr in corrs) {
    if (Math.abs(corrs[corr]) >= 0.15){
        console.log(corr + ' ' + corrs[corr]);
    };
}

for (var i = 0; i < JOURNAL.length; i++) {
    var entry = JOURNAL[i];
    if (hasEvent('peanuts', entry) && !hasEvent('brushed teeth', entry)) {
        entry.events.push('peanut teeth');
    }
};

console.log(countPhi(tableFor('peanut teeth', JOURNAL)))