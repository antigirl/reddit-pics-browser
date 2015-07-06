var Promise = require('Promise');
var stub = require('./redditPicsStub.json');

module.exports = {
    externalCall: function() {
        return Promise.resolve(stub);
    }
};
