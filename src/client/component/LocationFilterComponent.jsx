var React = require('react');
var Filter = require('../../common/model/Filter');

/**
 * Encapsulates the LocationFilterComponent of the application
 */
var LocationFilterComponent = React.createClass({
    getLocation : function() {
        navigator.geolocation.getCurrentPosition(this.onLocateSuccess, this.onLocateError);
    },

    onLocateSuccess : function(position) {
        this.setState({
            lat : position.coords.latitude,
            lon : position.coords.longitude
        });
    },

    onLocateError : function() {
        console.log('Error getting location');
    },

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
                    <p>Miles of</p>
                    <input type="text" className="lat" name="lat" value={this.state.lat} placeholder="Latitude" disabled={this.state.disabled} />
                    <input type="text" className="lon" name="lon" value={this.state.lon} placeholder="Longitude" disabled={this.state.disabled} />
                    <button className="get-lat-lon" onClick={this.getLocation} disabled={this.state.disabled}>Get Location</button>
                </div>
                <div style={{clear: 'both'}}></div>
	        </div>
        );
	}
});

module.exports = LocationFilterComponent;