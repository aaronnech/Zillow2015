var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates the header of the application
 */
var HeaderComponent = React.createClass({
	/**
	 * For the current screen property, return a text that matches it.
	 * @return {string} Screen display name
	 */
	getScreenText : function () {
		switch (this.props.screen) {
			case Constants.SCREENS.HOME: 
				return "Search Homes";
        	case Constants.SCREENS.SETTINGS:
        		return "Settings";
        	case Constants.SCREENS.DETAILS:
        		return "Home Details";
        	case Constants.SCREENS.LIST:
        		return "Saved Homes";
        	case Constants.SCREENS.PROFILE:
        		return "Your personal profile";
		}
		return "";
	},

	/**
	 * Render the header
	 */
    render: function() {
    	var screenText = this.getScreenText();
        return (
	        <div id="header">
	        	<img src="img/icon.den.png" />
	        	<p><strong>CasualHome</strong> : {screenText}</p>
	        </div>
        );
	}
});

module.exports = HeaderComponent;