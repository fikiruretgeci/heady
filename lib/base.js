'use strict';

exports.clear = function(value) {
    value = value.trim();
    return value.replace(/([^\qwertyuıopğüasdfghjklşizxcvbnmöçQWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ0123456789])/g,'');
};