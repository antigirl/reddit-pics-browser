var React = require('react');

var Item = React.createClass({
    componentDidMount: function() {
    //    var node = this.getDOMNode();
    //    console.log(node.scrollTop);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        //console.log(this.props.scrollPos);
        console.log(this.props.title);
        //dont render after initial render
        if (nextProps.scrollPos > 0) {
            return false;
        }
    },
    render: function() {
        //this.props.scrollPos === this.getDOMNode().esajkfdnc.top
        return (<li className="content__post">
            <header className="content__post-header">
                <p>{this.props.title}</p>
                <div><span className="content__post-score">{this.props.score}</span></div>
            </header>
            {this.props.type=='link' ? <a href={this.props.url}>link to post</a> : <img className="content__image" src={this.props.url}/>}
        </li>);
    }

});

module.exports = Item;
