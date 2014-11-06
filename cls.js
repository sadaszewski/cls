/*

Call-Local Storage mechanism for JavaScript
Author: Stanislaw Adaszewski, 2014
Email: s.adaszewski@gmail.com
http://algoholic.eu

*/

(function() {

var CLS = this.CLS = {};

CLS.CallId = function(id) {
    this._id = id;
};

CLS.getId = function(args) {
    // console.log(args);
    // var args = arguments.callee.caller.arguments.callee.caller.arguments;
    for (var i = 0; i < args.length; i++) {
        if (args[i] instanceof CLS.CallId) {
            return args[i]._id;
        }
    }
};

CLS.define = function(obj, name) {
    if (!('__callLocalStorage' in obj)) {
        obj.__callLocalStorage = {};
    }
    Object.defineProperty(obj, name, {
        'get': function() {
            var id = CLS.getId(arguments.callee.caller.arguments);
            // console.log('get, id:' + id);
            return this.__callLocalStorage[id][name];
        },

        'set': function(val) {
            var id = CLS.getId(arguments.callee.caller.arguments);
            // console.log('set, id:' + id);
            var cls = this.__callLocalStorage;
            if (!(id in cls)) cls[id] = {};
            cls[id][name] = val;
        }
    });
};

if (typeof module !== undefined) {
    module.exports = CLS;
}

})();
