var React = require('react');
var appStore = require('../stores/appStore.js');
var appActions = require('../actions/appActions');

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
    },
    render: function() {
        var bg;
        return (
            <ul className="content__wrapper">
                {this.state.items ?
                    this.state.items.map(function (item) {
                        console.log(item);
                        bg = { 'background-image': 'url(' + item.url + ')' };
                        return (<li className="content__post">
                            <header className="content__post-header">
                                <p>{item.title}</p>
                                <div><span className="content__post-score">{item.score}</span></div>
                            </header>
                            <img className="content__image" src={item.url}/>
                        </li>);
                    })
                : <li> no data </li> }
            </ul>

        );
    }
});

module.exports = Items;
