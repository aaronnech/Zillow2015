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
            lat : Number(position.coords.latitude),
            lon : Number(position.coords.longitude)
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
            lat : 0,
            lon : 0,
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
        return new Filter(function(json, value) {
            var toRadians = function(angle) {
              return angle * (Math.PI / 180);
            }

            // Haversine formula
            var R = 3963.1676; // miles
            var φ1 = toRadians(json.lon);
            var φ2 = toRadians(value.lat);
            var Δφ = toRadians((value.lat-json.lat));
            var Δλ = toRadians((value.lon-json.lon));
            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;

            return d <= value.miles;
        }, {lat : this.state.lat, lon : this.state.lon, miles : this.state.miles}, this.state.disabled);
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
                        <input type="number" className="miles" name="miles" value="0" onChange={this.onDistanceChange} placeholder="Distance (mi)" disabled={this.state.disabled} />
                    </div>
                    <div style={{clear: 'both'}}></div>
                </fieldset>
	        </div>
        );
	}
});

module.exports = LocationFilterComponent;