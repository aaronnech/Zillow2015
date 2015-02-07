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
				<h2>{home.getDescription()}</h2>
				<a className="btn" href={home.getLink()}>Link</a>
	        </div>
        );
	}
});

module.exports = CardBackComponent;