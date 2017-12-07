'use strict';

var config = require('./config/index');
var heady = require('./lib/heady');
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var globalData = null;
var rtm = new RtmClient(config.BOT_TOKEN);

// RTM.AUTHENTICATED
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
    globalData = heady.collectGlobalData(rtmStartData);
});

// SEND MESSAGES
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    console.log('****'+config.NAME+' Listening****');
});

// RECEIVED MESSAGE
rtm.on(RTM_EVENTS.MESSAGE, function (argv) {
    // Only Known Users Progressing
    // If removes this conditions, bot reply own messages and looping and and crashing
    if(Object.keys(globalData.users).indexOf(argv.user) !== -1) {
        heady
            .run(argv, globalData)
            .then(function(response) {
                if(!!response.message) {
                    // Fake message typing data sending
                    rtm.sendTyping(argv.channel);
                    setTimeout(function(){
                        rtm.sendMessage(response.message, response.channel);
                    }, 1000);
                }
            }).catch(function (err) {
                console.log('ERROR:', err);
            });
    }
});

rtm.start();