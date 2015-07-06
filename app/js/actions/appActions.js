var appDispatcher = require('../dispatcher/appDispatcher');
var constants = require('../constants/appConstants');
var api = require('../utils/appApi.js')

module.exports = {
    addItem: function(item) {
        appDispatcher.dispatch({
            type: constants.ADD_ITEM,
            item: item
        });
    },

    removeItem: function(item) {
        appDispatcher.dispatch({
            type: constants.REMOVE_ITEM,
            item: item
        });
    },

    makeAPIcall: function() {
        api.externalCall().then(function() {
            appDispatcher.dispatch({
                type: constants.API_CALL
            });
        });
    }
};
