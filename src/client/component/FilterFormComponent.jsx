var React = require('react');
var Filter = require('../../common/model/Filter');
var LocationFilterComponent = require('./LocationFilterComponent.jsx');

/**
 * Encapsulates the header of the application
 */
var FilterFormComponent = React.createClass({

    onFilterChange : function(filterComponent) {
    	var currentFilters 
    	var disabled = filterComponent.getEnabled();
    	var name = filterComponent.getName();
    	var filter = filterComponent.getFilter();

    	if (disabled) {
    		this.props.API.disableFilter(name);
    	} else {
    		this.props.API.enableFilter(name, filter);
    	}
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