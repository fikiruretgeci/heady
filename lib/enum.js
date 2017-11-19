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
    'CMD' : 'CMD [param] [param2]' + "\r" + '> _Alias_: cmd',
    'SUBCMD' : {
        'START' : 'CMD START [auth]' + "\r" + '> _Alias_: start',
        'FINISH' : 'CMD FINISH [auth] [param]' + "\r" + '> _Alias_: finish'
    },
    'CROSSCHECK' : 'CROSSCHECK' + "\r",
    'HEADY' : 'HEADY' + "\r" + '> _Alias_: heady,HEY,hey',
    'WHOM' : 'WHOM' + "\r" + '> _Alias_: whom',
    'HELP' : 'HELP' + "\r"
};

exports.dmTypes = {
    USER: 1,
    CHANNEL: 2
};