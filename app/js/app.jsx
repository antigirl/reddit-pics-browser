var React = require('react');
var Items = require('./components/items');
require('../styles/app.scss');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Items/>
      </div>
    );
  }
});

React.render(<App/>, document.body);
