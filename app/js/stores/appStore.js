var appDispatcher = require('../dispatcher/appDispatcher');
var appActions = require('../actions/appActions');
var constants = require('../constants/appConstants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var items = ['item1', 'item2'];

function addItem(item) {
  items.push(item);
}

function removeItem(item) {
  var index = items.indexOf(item);
  if(index !== -1) {
    items.splice(index, 1);
  }
}

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

  getItems: function () {
    return items;
  },

  dispatcherIndex: appDispatcher.register(function (payload) {
    switch(payload.type) {
      case constants.ADD_ITEM:
      addItem(payload.item);
      break;

      case constants.REMOVE_ITEM:
      removeItem(payload.item);
      break;

      case constants.API_CALL:
      addItem('ITEM FROM API');
      break;
    }

    appStore.emitChange();

    return true;

  })
});

module.exports = appStore;
