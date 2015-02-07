var React = require('react');
var Filter = require('../../common/model/Filter');

/**
 * Encapsulates the SourceFilterComponent of the application
 */
var SourceFilterComponent = React.createClass({

    /**
     * Initialize
     */
    componentDidMount : function() {
        
    },

    /**
     * Called when the component updates
     */
    componentDidUpdate: function() {
        this.props.onChangeFilter(this);
    },

    /**
     * Get the initial state
     */
    getInitialState : function() {
        return {
            disabled : this.props.API.isFilterEnabled(this.getName())
        };
    },

    /**
     * Get if this filter is enabled or not
     * @return {boolean} True if enabled, false otherwise
     */
    getEnabled : function() {
        return !this.state.disabled;
    },

    /**
     * Gets the name of this filter
     * @return {string} the name
     */
    getName : function() {
        return "source-" + this.props.filterId;
    },

    /**
     * Gets the filter for this filter component
     * @return {Filter} the filter
     */
    getFilter : function() {
        return new Filter(function(json, value) {
            return json.source != value;
        }, this.props.source, this.state.disabled);
    },

    /**
     * Called when the checkbox changes state
     */
    onCheckBoxChange : function() {
        this.setState({disabled : !this.state.disabled});
    },

	/**
	 * Render the component
	 */
    render : function() {
        return (
	        <div className={"filter source-filter " + (this.state.disabled ? 'disabled' : 'enabled')}>
                <fieldset>
                    <legend>Data Source - {this.props.displayName}</legend>
                    <div className="left">
                        <input type="checkbox" name="enabled" onChange={function(){}} checked={!this.state.disabled}>
                        </input>
                        <label htmlFor="enabled" onClick={this.onCheckBoxChange}>
                            <span className="ui"></span>
                        </label>
                    </div>
                    <div className="right">
                        <p>{this.props.displayName}</p>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </fieldset>
	        </div>
        );
	}
});

module.exports = SourceFilterComponent;