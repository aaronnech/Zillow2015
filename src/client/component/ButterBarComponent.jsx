var React = require('react');

/**
 * Encapsulates the butter bar
 */
var ButterBarComponent = React.createClass({
    /**
     * Get the initial state
     */
    getInitialState : function() {
        var self = this;
        var first = this.props.API.isFirstLaunch();
        var initialMessage = first ?
                "Welcome to Den! Please fill out the profile information to make your experience better" : "";

        if (first) {
            setTimeout(function() {
                self.setState({blink : false});
            }, 1000);
        }

        return {
            message : initialMessage,
            show : first,
            blink : first
        };
    },

    /**
     * Dismisses the butter bar
     */
    dismiss : function() {
        var next = this.props.API.getNextButterBar();
        if (next != "") {
            this.setState({message : next});
            this.blink();
        } else {
            this.setState({show : false});
        }
    },

    /**
     * Blinks the butter bar
     */
    blink : function() {
        var self = this;
        this.setState({blink : true});
        setTimeout(function() {
            self.setState({blink : false});
        }, 1000);
    },

	/**
	 * Render the butter bar
	 */
    render : function() {
        return (
	        <div className={"butter-bar " + (this.state.blink ? "blink" : "")} onClick={this.blink} style={{'display' : (this.state.show ? 'block' : 'none')}}>
                <p>{this.state.message}</p>
                <img className="close-button" src="img/icon.remove.png" onClick={this.dismiss} />
	        </div>
        );
	}
});

module.exports = ButterBarComponent;