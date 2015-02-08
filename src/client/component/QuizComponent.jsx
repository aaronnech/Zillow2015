var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates the profile form
 */
var QuizComponent = React.createClass({
    //How large is the bar
    BAR_SIZE : 3,
    //Calculated based on the number of features and size of bars
    FINAL_TOTAL_SIZE : 64,
    TOTAL_SIZE : this.FINAL_TOTAL_SIZE,


    //Map that keeps track of all the house stats
    HOUSE_STATS : {},

    attributes : ["crime", "education", "homesize", "commute"],


    /**
     * Get the initial state
     */
    getInitialState : function() {
        this.updateStats("A");

        TOTAL_SIZE = this.FINAL_TOTAL_SIZE;
        this.updateStats("B");
        return {
            "A" : {
                "crime": this.HOUSE_STATS["crimeA"],
                "education": this.HOUSE_STATS["educationA"],
                "homesize": this.HOUSE_STATS["homesizeA"],
                "commute": this.HOUSE_STATS["commuteA"]
            },
            "B" : {
                "crime": this.HOUSE_STATS["crimeB"],
                "education": this.HOUSE_STATS["educationB"],
                "homesize": this.HOUSE_STATS["homesizeB"],
                "commute": this.HOUSE_STATS["commuteB"]
            }
        };
    },

    updateStats : function(house) {
        function getRating(rating) {
            if(rating > this.TOTAL_SIZE)
                rating = this.TOTAL_SIZE;
            this.TOTAL_SIZE -= rating;
            return rating;
        };
        for(i = 0; i < this.attributes.length; i++) {
            rating = getRating(this.randomRating())
            console.log("the rating for " + this.attributes[i] + " is "  + rating);
            this.HOUSE_STATS[this.attributes[i] + house] = rating;
        }
        if(this.total_size != 0) {
            increment = this.total_size / this.attributes.length;
            for(i = 0; i < this.attributes.length; i++) {
                if( 31 - ths.HOUSE_STATS[this.attributes[i] + house] >= increment) {
                    this.HOUSE_STATS[this.attributes[i] + house] += increment;
                    this.HOUSE_STATS[this.attributes[i] + house] = 31;
                }
            }
        }
        

    },

    onChooseA : function() {
        TOTAL_SIZE = this.FINAL_TOTAL_SIZE;
        this.updateStats("A");



    },

    onChooseB : function() {
        TOTAL_SIZE = this.FINAL_TOTAL_SIZE;
        this.updateStats("B");


    },
    //number from 0-30
    randomRating : function() {
        return Math.round(Math.random() * 10) * this.BAR_SIZE + 1;
    },

    getColor : function(value) {
        if(value < this.BAR_SIZE * 10 / 3 )
            return "red";
        else if(value >= this.BAR_SIZE * 20 / 3)
            return "green";
        else 
            return "yellow";

    },

	/**
	 * Render the profile form
	 */
    render : function() {
    	var profile = this.props.profile;

        return (
        	<div className="quiz-component">
                <div className="houseA" onClick = {this.onChooseA}>
                Option_A
                    <div >
                       <img className="housepic" src = "https://s3.amazonaws.com/zillowhacknechboom/house_picture.png" /> 
                       </div>
                    <div className="ratingname"> lack of crime </div>
                    <div className="ratingBar"
                        style={{
                            "width" : this.state.A.crime + "%",
                            "backgroundColor": this.getColor(this.state.A.crime)
                        }}> 
                    </div>

                    <div className="ratingname"> good education </div>
                    <div className="ratingBar"
                        style={{
                            "width" : this.state.A.education + "%",
                            "background-color": this.getColor(this.state.A.education) 
                        }}> 

                    </div>
                      <div className="ratingname"> large homesize </div>
                    <div className="ratingBar"
                        style={{
                            "width" : this.state.A.homesize + "%",
                            "background-color": this.getColor(this.state.A.homesize) 
                        }}> 
                    </div>

                    <div className="ratingname"> short_commute </div>
                      <div className="ratingBar"
                        style={{
                            "width" : this.state.A.commute + "%",
                            "background-color": this.getColor(this.state.A.commute) 
                        }}>  
                    </div>
                </div>

                <div className="houseB" onClick = {this.onChooseB}>
                    Option_B
                    <div >
                       <img className="housepic" src = "https://s3.amazonaws.com/zillowhacknechboom/house_picture.png" /> 
                       </div>
				 <div className="ratingname"> lack of crime </div>
                    <div className="ratingBar"
                        style={{
                            "width" : this.state.B.crime + "%",
                            "backgroundColor": this.getColor(this.state.B.crime)
                        }}> 
                    </div>

                    <div className="ratingname"> good education </div>
                    <div className="ratingBar"
                        style={{
                            "width" : this.state.B.education + "%",
                            "background-color": this.getColor(this.state.B.education) 
                        }}> 

                    </div>
                      <div className="ratingname"> large homesize </div>
                    <div className="ratingBar"
                        style={{
                            "width" : this.state.B.homesize + "%",
                            "background-color": this.getColor(this.state.B.homesize) 
                        }}> 
                    </div>

                    <div className="ratingname"> short_commute </div>
                      <div className="ratingBar"
                        style={{
                            "width" : this.state.B.commute + "%",
                            "background-color": this.getColor(this.state.B.commute) 
                        }}>  
                    </div>
                </div>
            </div>
        	
        );
	}
});

module.exports = QuizComponent;