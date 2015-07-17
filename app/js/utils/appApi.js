var Promise = require('Promise');
var request = require('browser-request');
var stub = require('./redditPicsStub.json');

module.exports = {
    count: 3,
    after: '',

    externalCall: function() {
        var endpoint = 'http://api.reddit.com/r/pics/?limit=3&count='+this.count + this.after;
        var self = this;
         /* return new Promise(function(resolve, reject){
              request(endpoint, function (err, res, body) {
                 var json = JSON.parse(body);
                 self.after = '&after=' + json.data.after;
                 self.count +=3;
                 return resolve(json);
              });
          });*/
        return Promise.resolve(stub);
    }
};
