Heady Slack Bot
======
Create Your Slack Bot With Simple Commands

##Why
* It is a starting kit for creating own Slack Bot User

##What
* Understands some commands
* Send DM to real users

##How
* First you can create new Bot User for your Team -> https://my.slack.com/services/new/bot
* Get the Bot User Token key. -> xoxb-XXXXXXXXX
* Update /config/index.js -> BOT_TOKEN line
* Run this index.js file -> we use pm2 for run js files. (pm2 start process.json && pm2 save)

###Where Do We Use Advanced Version of Heady
We use it in the company;
- Lunch Choice
- Create new test users
- Search usernames
- etc...

###Used Wonderful Packages
* @slack/client -> https://github.com/slackapi/node-slack-sdk
* bluebird -> https://github.com/petkaantonov/bluebird