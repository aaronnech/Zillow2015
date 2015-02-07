var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates a card back side
 */
var CardBackComponent = React.createClass({
	/**
	 * Render the card front
	 */
    render: function() {
    	var home = this.props.data;

        return (
	        <div>
				<h2>{home.getDescription() || "No Description found"}</h2>
				<a target="_blank" style={{'display' : home.getLink() ? 'block' : 'none'}} className="btn" href={home.getLink()}>Source</a>
	        </div>
        );
	}
});

module.exports = CardBackComponent;