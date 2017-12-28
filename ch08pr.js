
/*
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a,b) {
    if (Math.random() < 0.5) {
        return a*b;
    }
    else {
        throw new MultiplicatorUnitFailure();
    }
}

function reliableMultiply(a,b) {
    for (;;) {
        try {
            return primitiveMultiply(a,b);
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                console.log("Multiplication error" + e);
            } else {
                throw e;
            }
        }
    }
}

console.log(reliableMultiply(8,8))

*/

var box = {
    locked: true,
    unlock: function(){this.locked = false;},
    lock: function(){this.locked = true;},
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    var locked = box.locked;
    box.unlock();
    try {body();}
    catch(e) {return e.message;}
    finally {if(locked) box.lock();};
}