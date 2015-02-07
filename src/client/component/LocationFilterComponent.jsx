var React = require('react');
var Filter = require('../../common/model/Filter');

/**
 * Encapsulates the LocationFilterComponent of the application
 */
var LocationFilterComponent = React.createClass({
    /**
     * Get the current location
     */
    getLocation : function() {
        navigator.geolocation.getCurrentPosition(this.onLocateSuccess, this.onLocateError);
    },

    /**
     * Initialize
     */
    componentDidMount : function() {
        this.getLocation();
    },

    /**
     * Located successfully
     */
    onLocateSuccess : function(position) {
        this.setState({
            lat : position.coords.latitude,
            lon : position.coords.longitude
        });
    },

    /**
     * Location error
     */
    onLocateError : function() {
        console.log('Error getting location');
    },

    /**
     * Get the initial state
     */
    getInitialState : function() {
        return {
            lat : "",
            lon : "",
            miles : 0,
            disabled : true
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
        return "location";
    },

    /**
     * Gets the filter for this filter component
     * @return {Filter} the filter
     */
    getFilter : function() {
        return new Filter();
    },

    /**
     * Called when the checkbox changes state
     */
    onCheckBoxChange : function() {
        this.setState({disabled: !this.state.disabled});
    },

    /**
     * Called when distance is changed
     */
    onDistanceChange : function(ev) {
        if (ev.target.validity.valid) {
            if (ev.target.value > 0) {
                this.setState({miles : ev.target.value});
            }
        }
    },

	/**
	 * Render the component
	 */
    render : function() {
        return (
	        <div className={"filter location-filter " + (this.state.disabled ? 'disabled' : 'enabled')}>
                <fieldset>
                    <legend>Location</legend>
                    <div className="left">
                        <input type="checkbox" name="enabled" onChange={function(){}} checked={!this.state.disabled}>
                        </input>
                        <label htmlFor="enabled" onClick={this.onCheckBoxChange}>
                            <span className="ui"></span>
                        </label>
                    </div>
                    <div className="right">
                        <p>Within</p>
                        <input type="number" className="miles" name="miles" onChange={this.onDistanceChange} placeholder="Distance (mi)" disabled={this.state.disabled} />
                        <p>miles of me</p>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </fieldset>
	        </div>
        );
	}
});

module.exports = LocationFilterComponent;