'use strict';

var config = require('../config/index');
var Promise = require('bluebird');
var WebClient = require('@slack/client').WebClient;
var web = new WebClient(config.BOT_TOKEN);

// CMD
exports.cmd = function(params) {
    return new Promise(function (resolve, reject) {
        if(params.length > 0) {
            return resolve(params.join(', '));
        } else {
            return reject('Params not found!');
        }
    });
};

// SUBCMD
exports.subCmdStart = function(argv) {
    return new Promise(function(resolve, reject) {
        var auth = (typeof argv.argv[0] === 'undefined') ? null : argv.argv[0];
        if (!!auth && config.AUTH === auth){
            return resolve('Started :wink:');
        } else {
            return reject('Auth code not correct!');
        }
    });
};

// CMD
exports.subCmdFinish = function (argv) {
    return new Promise(function (resolve, reject) {
        var auth = (typeof argv.argv[0] === 'undefined') ? null : argv.argv[0];
        if (!!auth && config.AUTH === auth){
            var param1 = (typeof argv.argv[1] === 'undefined') ? null : argv.argv[1];
            if (!!param1){
                return resolve('Finished :wink:');
            } else {
                return reject('Param not found!');
            }
        } else {
            return reject('Auth code not correct!');
        }
    });
};

// Send DM Command
exports.sendDm = function (senders, msg) {
    if(!!senders && Object.keys(senders).length > 0) {
        for (var i in senders) {
            web.dm.open(senders[i].id, function(d, e) {
                var opts = {as_user:true}; // Bot sends message as a real user.
                web.chat.postMessage(e.channel.id,msg,opts, function(f, g){
                    web.dm.close();
                });
            });
        }
    }
};