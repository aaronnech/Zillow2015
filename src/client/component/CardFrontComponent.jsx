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
    	if (home) {
			var rentString = "Rent: $" + home.getRentPrice() + " /mo";
			var buyString = "Buy: $" + home.getBuyPrice();
			var priceString = home.getRentPrice() != undefined ? rentString : 
							  home.getBuyPrice() != undefined ? buyString : "Price: N/A";

			var IP = null;
			if (this.props.profile.getSalary() && home.getRentPrice()) {
				IP = Math.floor(this.props.profile.getSalary() / (home.getRentPrice() * 12) * 100);
			} else if (this.props.profile.getSalary() && home.getBuyPrice()) {
				IP = Math.floor(this.props.profile.getSalary() / home.getBuyPrice() * 100);
			}

	        return (
		        <div>
					<img src={home.getImage() || Constants.DEFAULT_HOUSE_IMAGE} />
					<h2>{priceString} | {home.getAddress()}</h2>
					<h2>I/P: {IP ? IP + '%' : 'N/A'} | Bed: {home.getBedrooms() ? home.getBedrooms() : 'N/A'}</h2>
		        </div>
	        );
    	} else {
    		return (<div></div>)
    	}
	}
});

module.exports = CardFrontComponent;