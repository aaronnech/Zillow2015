var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates a card front side
 */
var CardFrontComponent = React.createClass({

	clickIP : function(e) {
		this.props.butter.setMessage('IP is the percentage of your income this home costs');
		e.stopPropagation();
		return false;
	},

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
				salary = this.props.profile.getSalary();
				rent_price = home.getRentPrice() * 12;
				console.log("salary " + salary);
				console.log("rent_price " + rent_price);
				console.log("percentage " + (salary / rent_price) * 100);
			} else if (this.props.profile.getSalary() && home.getBuyPrice()) {
				IP = Math.floor(this.props.profile.getSalary() / home.getBuyPrice() * 100);
			}

	        return (
		        <div>
					<img src={home.getImage() || Constants.DEFAULT_HOUSE_IMAGE} />
					<div><p><strong>{priceString}</strong> | {home.getAddress()}</p></div>
					<div><p><strong>I/P:</strong> {IP ? IP + '%' : 'N/A'} | <strong>Bed:</strong> {home.getBedrooms() ? home.getBedrooms() : 'N/A'}</p></div>
		        </div>
	        );
    	} else {
    		return (<div></div>)
    	}
	}
});

module.exports = CardFrontComponent;