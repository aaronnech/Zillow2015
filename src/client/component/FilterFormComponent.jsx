var React = require('react');
var Filter = require('../../common/model/Filter');
var LocationFilterComponent = require('./LocationFilterComponent.jsx');

/**
 * Encapsulates the header of the application
 */
var FilterFormComponent = React.createClass({

    onFilterEnable : function(filter, name) {

    },

	/**
	 * Render the saved list
	 */
    render : function() {
        return (
	        <div className="filter-form">
                <LocationFilterComponent onEnable={this.onFilterEnable} />
	        </div>
        );
	}
});

module.exports = FilterFormComponent;