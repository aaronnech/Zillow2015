var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates the header of the application
 */
var SavedHomeComponent = React.createClass({
	/**
	 * Render the saved home item
	 */
    render: function() {
    	var home = this.props.data;

    	var rentString = "Rent: $" + home.getRentPrice() + " /mo";
    	var buyString = "Buy: $" + home.getBuyPrice();
    	var priceString = home.getRentPrice() != undefined ? rentString : buyString;

        return (
	        <li className="saved-home">
	        	<img src={home.getImage() || Constants.DEFAULT_HOUSE_IMAGE} />
	        	<p>{priceString}</p>
	        </li>
        );
	}
});

module.exports = SavedHomeComponent;