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

		// var rentString = "Rent: $" + home.getRentPrice() + " /mo";
		// var buyString = "Buy: $" + home.getBuyPrice();
		// var priceString = home.getRentPrice() != undefined ? rentString : 
		// 				  home.getBuyPrice() != undefined ? buyString : "Price: N/A";

		// var IP = null;
		// if (this.props.profile.getSalary() && home.getRentPrice()) {
		// 	IP = Math.floor(this.props.profile.getSalary() / (home.getRentPrice() * 12) * 100);
		// } else if (this.props.profile.getSalary() && home.getBuyPrice()) {
		// 	IP = Math.floor(this.props.profile.getSalary() / home.getBuyPrice() * 100);
		// }

        return (
	        <li className="saved-home" onClick={this.props.onClickItem} >
	        	<img src={home.getImage() || Constants.DEFAULT_HOUSE_IMAGE} />
				<p>{home.getAddress()}</p>
	        	<img className="remove" src="img/icon.remove.png" onClick={(function(e) {this.props.onRemoveHome(this); e.stopPropagation();}).bind(this)} className="remove" />
	        </li>
        );
	}
});

module.exports = SavedHomeComponent;