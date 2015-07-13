var Promise = require('Promise');
var request = require('browser-request');
var stub = require('./redditPicsStub.json');

module.exports = {
    externalCall: function() {
        console.log('making a call');
         return new Promise(function(resolve, reject){
             request('http://api.reddit.com/r/pics/?limit=3', function (err, res, body) {
                return resolve(JSON.parse(body));
             });
         });
        //return Promise.resolve(stub);
    }
};
