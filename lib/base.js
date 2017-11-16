'use strict';

exports.clear = function(value) {
    value = value.trim();
    return value.replace(/([^\qwertyuıopğüasdfghjklşizxcvbnmöçQWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ0123456789])/g,'');
};

exports.defaultGlobalData = function () {
    return {
        team: null,
        users: null,
        channels: null
    };
};