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
            disabled : true,
        };
    },

    onCheckBoxChange : function() {
        this.setState({disabled: !this.state.disabled});
    },

    onDistanceChange : function(ev) {
        if (event.target.validity.valid) {
            this.setState({miles : event.target.value});
        }
    },

	/**
	 * Render the component
	 */
    render : function() {
        return (
	        <div className={"location-filter " + (this.state.disabled ? 'disabled' : 'enabled')}>
                <div className="left">
                    <input type="checkbox" name="enabled" checked={!this.state.disabled}>
                    </input>
                    <label htmlFor="enabled" onClick={this.onCheckBoxChange}>
                        <span className="ui"></span>
                    </label>
                </div>
                <div className="right">
                    <p>Within</p>
                    <input type="number" className="miles" name="miles" onChange={this.onDistanceChange} placeholder="Distance (mi)" disabled={this.state.disabled} />
                    <p>Miles of Me</p>
                </div>
                <div style={{clear: 'both'}}></div>
	        </div>
        );
	}
});

module.exports = LocationFilterComponent;