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
	        <li className="saved-home" onClick={this.props.onClickItem} >
	        	<img src={home.getImage() || Constants.DEFAULT_HOUSE_IMAGE} />
	        	<p>{priceString}</p>
	        	<img src="img/icon.remove.png" onClick={(function(e) {this.props.onRemoveHome(this); e.stopPropagation();}).bind(this)} className="remove" />
	        </li>
        );
	}
});

module.exports = SavedHomeComponent;