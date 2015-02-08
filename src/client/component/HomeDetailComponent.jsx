var React = require('react');
var Constants = require('../Constants');

var CardFrontComponent = require('./CardFrontComponent.jsx');
var CardBackComponent = require('./CardBackComponent.jsx');

/**
 * Encapsulates the HomeDetailComponent of the application
 */
var HomeDetailComponent = React.createClass({
	/**
	 * Render the header
	 */
    render: function() {
    	// TODO: display home
        return (
	        <div className="home-detail">
	        	<CardFrontComponent profile={this.props.profile} data={this.props.data} />
	        	<hr />
	        	<CardBackComponent profile={this.props.profile} data={this.props.data} />
	        </div>
        );
	}
});

module.exports = HomeDetailComponent;