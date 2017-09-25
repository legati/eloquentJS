/* 
Sequence interface

Design an interface that abstracts iteration over a collection of values. 
An object that provides this interface represents a sequence, and the interface 
must somehow make it possible for code that uses such an object to iterate over 
the sequence, looking at the element values it is made up of and having some way 
to find out when the end of the sequence is reached.

When you have specified your interface, try to write a function logFive that takes 
a sequence object and calls console.log on its first five elements—or fewer, 
if the sequence has fewer than five elements.

Then implement an object type ArraySeq that wraps an array and allows iteration over 
the array using the interface you designed. Implement another object type RangeSeq that 
iterates over a range of integers (taking from and to arguments to its constructor) instead.
 */

 //interface: iterate()
 
logFive = function(obj) {
    obj.iterate(console.log, 5)
}

ArraySeq = function(array) {
    var seq = {};
    seq.array = array;
    seq.length = array.length;
    seq.iterate = function(f, n) {
        var count = Math.min(n, this.length);
        for (var i = 0; i < count; i++) {
            f(this.array[i]);
        }
    }
    return seq;
}

RangeSeq = function(from, to){
    var array = [];
    for (var i = from; i <= to; i++) {
        array.push(i);
    }
    return new ArraySeq(array);
}


var test = new ArraySeq([1,2,3,4,'a', 5, 'aaad']);
var test2 = new RangeSeq(17, 48)
logFive(test2)