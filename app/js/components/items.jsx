var React = require('react');
var appStore = require('../stores/appStore.js');
var appActions = require('../actions/appActions');

var Items = React.createClass({
  getInitialState: function() {
    return {
      items: appStore.getData()
    };
  },
  componentWillMount:function(){
    var _this = this;
    //set up listener before render function
    //any time change is emitted, make sure to update state
    //updating state will re-render then
    appStore.addChangeListener( function() {
      _this.setState({items: appStore.getData()});
    });
  },
  componentDidMount: function() {
    appActions.makeAPIcall();
  },
  render: function() {
    return (
      <div> {this.state.items ? <ul>
            {this.state.items.map(function (item) {
                return <li>{item.title}<br/><img src={item.url} width="200" height="200"/></li>;
            })}
      </ul> : <span>no data</span>} </div>

    );
  }
});

module.exports = Items;
