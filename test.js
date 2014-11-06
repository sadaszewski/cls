/*

Call-Local Storage mechanism for JavaScript
Author: Stanislaw Adaszewski, 2014
Email: s.adaszewski@gmail.com
http://algoholic.eu

*/

(function() {

    var CLS = require('./cls.js');

    var Test = function() {
        CLS.define(this, 'x');
    }

    Test.prototype.make = function() {
        this.x = Math.random();
    }

    Test.prototype.use = function() {
        console.log(this.x);
    }

    var t = new Test();

    var a = new CLS.CallId('Call_A');
    var b = new CLS.CallId('Call_B');

    t.make(a);
    t.make(b);
    t.use(a);
    t.use(b);

})();
