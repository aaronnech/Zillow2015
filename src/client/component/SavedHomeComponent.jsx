var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates a saved home on a list
 */
var SavedHomeComponent = React.createClass({
	/**
	 * Render the saved home item
	 */
    render: function() {
    	var home = this.props.data;

    	var rentString = "Rent: $" + home.getRentPrice() + " /mo";
    	var buyString = "Buy: $" + home.getBuyPrice();
		var priceString = home.getRentPrice() != undefined ? rentString : 
						  home.getBuyPrice() != undefined ? buyString : "";

        return (
	        <li className="saved-home">
	        	<img src={home.getImage() || Constants.DEFAULT_HOUSE_IMAGE} />
	        	<p>{priceString}</p>
	        </li>
        );
	}
});

module.exports = SavedHomeComponent;