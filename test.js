var a = {
    b: {ff:5},
    c: function() {
        return this.b.length;
    }
};

console.log(a.c())