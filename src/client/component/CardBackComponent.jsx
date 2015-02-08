var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates a card back side
 */
var CardBackComponent = React.createClass({
    BAR_SIZE : 3,

    randomRating : function() {
        return Math.round(Math.random() * 10) * this.BAR_SIZE + 1;
    },

    getColor : function(value) {
        if(value < this.BAR_SIZE * 10 / 3 )
            return "red";
        else if(value > this.BAR_SIZE * 20 / 3)
            return "green";
        else 
            return "yellow";
    },

    /**
     * Get the initial state
     */
    getInitialState : function() {
        return {
            "crime": this.randomRating(),
            "education": this.randomRating(),
            "homesize": this.randomRating(),
            "commute": this.randomRating()
        };
    },

    /**
     * Called after component mounts
     */
    componentDidMount : function() {
        if (this.props.data) {
        	this.setState({
        		"crime" : Math.round((1 - (this.props.data.getCrimeCount() / 1000.0)) * 100)
        	});
        }
    },

	/**
	 * Render the card front
	 */
    render: function() {
    	var home = this.props.data;
    	if (home) {
	        return (
		        <div>
					<h2 className="ratingname">lack of crime</h2>
					<div className="ratingBar"
					    style={{
					        "width" : this.state.crime + "%",
					        "backgroundColor": this.getColor(this.state.crime)
					    }}> 
					</div>

					<h2 className="ratingname">good education</h2>
					<div className="ratingBar"
					    style={{
					        "width" : this.state.education + "%",
					        "background-color": this.getColor(this.state.education) 
					    }}> 

					</div>
					<h2 className="ratingname">large homesize</h2>
					<div className="ratingBar"
					    style={{
					        "width" : this.state.homesize + "%",
					        "background-color": this.getColor(this.state.homesize) 
					    }}> 
					</div>

					<h2 className="ratingname">short commute</h2>
					<div className="ratingBar"
					    style={{
					        "width" : this.state.commute + "%",
					        "background-color": this.getColor(this.state.commute) 
					    }}>  
					</div>
		        </div>
	        );
    	} else {
    		return (<div></div>);
    	}
	}
});

module.exports = CardBackComponent;