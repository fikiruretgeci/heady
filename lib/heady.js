'use strict';

var enums = require('./enum');
var base = require('./base');
var commands = require('./command');
var config = require('../config/index');
var global = require('./global');

exports.collectGlobalData = function (rtmStartData) {
    var globalData = global.globalData;

    // INFO: Team
    globalData.team = {
        id: rtmStartData.team.id,
        name: rtmStartData.team.name,
        domain: rtmStartData.team.domain
    };
    // INFO: Channels
    for (var i in rtmStartData.channels) {
        globalData.channels[rtmStartData.channels[i].id] = {
            id: rtmStartData.channels[i].id,
            name: rtmStartData.channels[i].name,
            name_normalized: rtmStartData.channels[i].name_normalized,
            is_channel: rtmStartData.channels[i].is_channel,
            is_member: rtmStartData.channels[i].is_member,
            is_private: rtmStartData.channels[i].is_private,
            is_general: rtmStartData.channels[i].is_general,
            is_archived: rtmStartData.channels[i].is_archived,
        };
    }
    // INFO: Users
    for (var u in rtmStartData.users) {
        // Collect only real users and exclude slack bot
        if(!rtmStartData.users[u].is_bot && rtmStartData.users[u].id !== 'USLACKBOT') {
            var userData = {
                id: rtmStartData.users[u].id,
                team_id: rtmStartData.users[u].team_id,
                name: rtmStartData.users[u].name,
                real_name: rtmStartData.users[u].real_name,
                // is_admin: rtmStartData.users[u].is_admin,
                // is_owner: rtmStartData.users[u].is_owner,
                // is_bot: rtmStartData.users[u].is_bot,
                // presence: rtmStartData.users[u].presence,
                color: rtmStartData.users[u].color,
            };

            globalData.users[rtmStartData.users[u].id] = userData;
            if(config.FATHERS.indexOf(rtmStartData.users[u].name) !== -1) {
                globalData.fathers[rtmStartData.users[u].id] = userData;
            }
        }
    }

    return globalData;
};

exports.parseAll = function(argv) {
    argv.text = (argv.text).substr(0, config.MSG_MAX);
    var defaultArgv = {
        cmd: null,
        subcmd: null,
        argv: null,
        text: null,
        msg: argv.text,
        channel: null,
        user: null,
        team: null,
        source_team: null
    };

    switch (argv.type)
    {
        case 'message':
            var explode = argv.text.split(' ');
            defaultArgv.cmd = (explode.length > 0) ? explode[0] : explode;
            defaultArgv.cmd = base.clear(defaultArgv.cmd);
            if(enums.cmdList.indexOf(defaultArgv.cmd) === -1) {
                defaultArgv.cmd = null;
            } else {
                var sliceCount = defaultArgv.cmd.length + 1;
                if(explode.length > 1 && enums.cmdSubList.indexOf(explode[1]) !== -1) {
                    defaultArgv.subcmd = base.clear(explode[1]);
                    sliceCount += defaultArgv.subcmd.length+1;
                }
                defaultArgv.text = argv.text.slice(sliceCount);
                defaultArgv.argv = defaultArgv.text.split(' ');
            }
            break;
    }

    defaultArgv.channel = argv.channel;
    defaultArgv.user = argv.user;
    defaultArgv.team = argv.team;
    defaultArgv.source_team = argv.source_team;

    return defaultArgv;
};

exports.run = function(argv, globalData) {
    var self = this;
    global.set(globalData);
    return new Promise(function (resolve, reject) {
        var response = {
            // status: false,
            message: 'Something wrong!',
            channel: argv.channel
        };
        argv = self.parseAll(argv);
        switch (argv.cmd)
        {
            case 'CMD':
            case 'cmd':
                if(argv.text.length > 0) {
                    var params = (argv.text.split(' ')).slice(0,10); // Max 10 params allowed
                    return commands.cmd(params).then(function (result) {
                        response.message = result;
                        return resolve(response);
                    }).catch(function(err) {
                        response.message = err.message;
                        return resolve(response);
                    });
                } else {
                    // No response
                    response.message = null;
                }
                break;
            case 'SUBCMD':
            case 'subcmd':
                if(!!argv.subcmd) {
                    switch (argv.subcmd){
                        case 'START':
                        case 'start':
                            return commands.subCmdStart(argv).then(function (result) {
                                response.message = result;
                                return resolve(response);
                            }).catch(function(err) {
                                response.message = err;
                                return resolve(response);
                            });
                            break;
                        case 'FINISH':
                        case 'finish':
                            return commands.subCmdFinish(argv).then(function (result) {
                                response.message = result;
                                return resolve(response);
                            }).catch(function(err) {
                                response.message = err;
                                return resolve(response);
                            });
                            break;
                    }
                } else {
                    // No response
                    response.message = null;
                }
                break;
            case 'HELP':
            case 'help':
                response.message = '*HELP COMMANDS*' + "\r\r";
                for (var h in enums.cmdDetail){
                    if(typeof enums.cmdDetail[h] === 'object') {
                        for (var mm in enums.cmdDetail[h]){
                            response.message += enums.cmdDetail[h][mm];
                        }
                    } else {
                        response.message += enums.cmdDetail[h];
                    }
                    response.message += "\r";
                }
                break;
            case 'HELLO':
            case 'hello':
                response.message = argv.cmd + ' *' + global.getOneUserRealName(argv.user) +  '* how can i help you?';
                break;
            case 'WHOM':
            case 'whom':
                response.message = config.WHOAMI;
                break;
            case 'HEADY':
            case 'heady':
            case 'HEY':
            case 'hey':
                response.message = 'Hoop. I\'m still here.';
                break;
            default:
                response.message = null;
                // Bot complains to fathers what other users say.
                if( Object.keys(global.getFathers()).indexOf(argv.user) === -1 ) {
                    var msg = 'Daddy, *' + global.getOneUserRealName(argv.user) +  '* asked something about: ' + argv.msg;
                    commands.sendDm(enums.dmTypes.USER, global.getFathers(), msg);
                }
        }

        return resolve(response);
    });
};