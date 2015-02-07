var React = require('react');
var Filter = require('../../common/model/Filter');
var LocationFilterComponent = require('./LocationFilterComponent.jsx');
var SourceFilterComponent = require('./SourceFilterComponent.jsx');

/**
 * Encapsulates the header of the application
 */
var FilterFormComponent = React.createClass({

	/**
	 * Called when a filter is modified
	 * @param  {any} filterComponent The modified filter component
	 */
    onFilterChange : function(filterComponent) {
    	console.log('Filter changed!');
    	var disabled = filterComponent.getEnabled();
    	var name = filterComponent.getName();
    	var filter = filterComponent.getFilter();

    	if (disabled) {
    		this.props.API.disableFilter(name, filter);
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
                <SourceFilterComponent API={this.props.API} onChangeFilter={this.onFilterChange} displayName="Craigslist" filterId="craigslist" source="craigslist" />
	        </div>
        );
	}
});

module.exports = FilterFormComponent;