var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates the HomeDetailComponent of the application
 */
var HomeDetailComponent = React.createClass({
	/**
	 * Render the header
	 */
    render: function() {
    	console.log(this.props.data);
    	// TODO: display home
        return (
	        <div className="home-detail">
	        </div>
        );
	}
});

module.exports = HomeDetailComponent;