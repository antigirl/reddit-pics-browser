var appDispatcher = require('../dispatcher/appDispatcher');
var appActions = require('../actions/appActions');
var constants = require('../constants/appConstants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _data;
var _page;

var appStore = assign(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getData: function () {
    return _data;
  },

  dispatcherIndex: appDispatcher.register(function (payload) {
    switch(payload.type) {
      case constants.API_CALL:
      _data = payload.response.data.children.map(function(item) {
          var itemURL = item.data.url;
          var itemType = item.data.subreddit;
          if(itemURL.indexOf('.jpg') === -1) {
              itemType = 'link';
          }
         return {title: item.data.title, url:itemURL, type:itemType, ups:item.data.ups, downs:item.data.downs, score:item.data.score};
      });
      break;
    }

    appStore.emitChange();

    return true;

  })
});

module.exports = appStore;
