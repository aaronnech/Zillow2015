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
    TOTAL_SIZE : 64,


    //Map that keeps track of all the house stats
    HOUSE_STATS : {},

    attributes : ["crime", "education", "homesize", "commute"],


    /**
     * Get the initial state
     */
    getInitialState : function() {

        this.updateStats("A");

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

    getRating : function(rating) {
            if(rating > this.TOTAL_SIZE) 
                rating = this.TOTAL_SIZE == 0 ? 1 : this.TOTAL_SIZE;
            this.TOTAL_SIZE = rating > this.TOTAL_SIZE ? 0 : this.TOTAL_SIZE - rating;

            return rating;
    },

    updateStats : function(house) {
        for(i = 0; i < this.attributes.length; i++) {
            rating = this.getRating(this.randomRating());
            this.HOUSE_STATS[this.attributes[i] + house] = rating;
        }
        //heuristic to try to keep the sides of the house equal
        this.TOTAL_SIZE = this.FINAL_TOTAL_SIZE;   

    },
    updateAllStats: function() {
        this.updateStats("A");
        this.updateStats("B");
        this.state.A.crime = this.HOUSE_STATS["crimeA"];
        this.setState({
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
            }});
    },

    submitResponse : function(which) {
        var qr = {
            A : this.state.A,
            B : this.state.B,
            clicked : which
        };
        this.props.profile.pushQuizResponse(qr);
        this.props.updateLocalProfile();
    },

    onChooseA : function() {
        this.TOTAL_SIZE = this.FINAL_TOTAL_SIZE;
        this.submitResponse("A");
        this.updateAllStats();
    },

    onChooseB : function() {
        this.TOTAL_SIZE = this.FINAL_TOTAL_SIZE;
        this.submitResponse("B");
        this.updateAllStats();
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