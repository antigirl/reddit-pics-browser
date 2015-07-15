var React = require('react');

var Item = React.createClass({
    getInitialState: function() {
        return {
            sticky: false,
            dissappearPos: 0
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.props.hash !== nextProps.hash || this.state.sticky !== nextState.sticky || nextState.dissappearPos < 0;
    },
    componentWillReceiveProps: function(nextProps) {
        var node = this.getDOMNode();
        var nodeHeight = node.clientHeight;
        var nodeBounds = node.getBoundingClientRect();
        var nodeHeaderHeight = 50;
        var nodeMarginBottom = 50;
        var dissappearLength = nodeHeaderHeight - nodeMarginBottom;

        if (nodeBounds.top <= 0 && nodeBounds.top >= nodeHeaderHeight*-1 && !this.state.sticky) {
           this.setState({sticky: true});
           console.log('sticky');
        }

        if (nodeHeight - Math.abs(nodeBounds.top) <= dissappearLength && this.state.sticky) {
            console.log('trigger');
            var newPos = this.state.dissappearPos-1;
            this.setState({dissappearPos:newPos});
        }

        if (this.state.dissappearPos <= nodeHeaderHeight*-1) {
              this.setState({sticky: false});
              this.setState({dissappearPos:newPos});
        }
    },
    render: function() {
        var stickyClass = 'content__post-header';
        if (this.state.sticky) {
            stickyClass += ' content__post-header-sticky';
        } else {
            stickyClass = 'content__post-header';
        }
        var style = {
            top: this.state.dissappearPos
        };

        console.log('rendering &', this.state.sticky);

        return (<li className='content__post'>
            <header className={stickyClass} style={style}>
                <p>{this.props.title}</p>
                <div><span className="content__post-score">{this.props.score}</span></div>
            </header>
            {this.props.type=='link' ? <a href={this.props.url}>link to post</a> : <img className="content__image" src={this.props.url}/>}
        </li>);
    }

});

module.exports = Item;
