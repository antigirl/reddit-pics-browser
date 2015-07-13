var React = require('react');
var appStore = require('../stores/appStore.js');
var appActions = require('../actions/appActions');
var Item = require('./item');
var throttler = require('lodash.throttle');

var Items = React.createClass({
    getInitialState: function() {
        return {
            items: appStore.getData()
        };
    },
    componentWillMount: function() {
        var _this = this;
        //set up listener before render function
        //any time change is emitted, make sure to update state
        //updating state will re-render then
        appStore.addChangeListener(function() {
            _this.setState({
                items: appStore.getData()
            });
        });
    },
    componentDidMount: function() {
        appActions.makeAPIcall();
        window.onscroll = throttler(function() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                appActions.makeAPIcall();
            }
        }, 900);
    },
    loadMore: function() {
        appActions.makeAPIcall();
    },
    render: function() {
        return (
            <div>
            <ul className="content__wrapper">
                {this.state.items ?
                    this.state.items.map(function (item) {
                        return <Item title={item.title} type={item.type} url={item.url} score={item.score}/>;
                    })
                : <li> no data </li> }
            </ul>
        </div>
        );
    }
});

module.exports = Items;
