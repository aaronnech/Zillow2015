var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates a card front side
 */
var CardFrontComponent = React.createClass({
	/**
	 * Render the card front
	 */
    render: function() {
    	var home = this.props.data;
		var rentString = "Rent: $" + home.getRentPrice() + " /mo";
		var buyString = "Buy: $" + home.getBuyPrice();
		var priceString = home.getRentPrice() != undefined ? rentString : 
						  home.getBuyPrice() != undefined ? buyString : "Price: N/A";
        return (
	        <div>
				<img src={home.getImage() || Constants.DEFAULT_HOUSE_IMAGE} />
				<h2>{priceString} | {home.getAddress()}</h2>
	        </div>
        );
	}
});

module.exports = CardFrontComponent;