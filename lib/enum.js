'use strict';

exports.cmdList = [
    'CMD','SUBCMD','HELP',
    'CMD','subcmd','help',
    'HELLO','WHOM',
    'hello','whom',
    'HEADY',
    'heady',
    'HEY',
    'hey'
];

exports.cmdSubList = [
    'START','FINISH',
    'start','finish'
];

exports.cmdDetail = {
    'CMD' : 'CMD [param] [param2]' + "\r" + '> _Alias_: cmd' + "\r",
    'SUBCMD' : {
        'START' : 'CMD START [auth]' + "\r" + '> _Alias_: start' + "\r",
        'FINISH' : 'CMD FINISH [auth] [param]' + "\r" + '> _Alias_: finish' + "\r"
    },
    'HEADY' : 'HEADY' + "\r" + '> _Alias_: heady,HEY,hey' + "\r",
    'WHOM' : 'WHOM' + "\r" + '> _Alias_: whom' + "\r",
    'HELP' : 'HELP' + "\r"
};

exports.dmTypes = {
    USER: 1,
    CHANNEL: 2
};