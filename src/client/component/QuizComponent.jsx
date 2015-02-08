var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates the profile form
 */
var QuizComponent = React.createClass({
    BAR_SIZE : 3,
    /**
     * Get the initial state
     */
    getInitialState : function() {
        return {
            "A" : {
                "crime": this.randomRating(),
                "education": this.randomRating(),
                "homesize": this.randomRating(),
                "commute": this.randomRating()
            },
            "B" : {
                "crime": this.randomRating(),
                "education": this.randomRating(),
                "homesize": this.randomRating(),
                "commute": this.randomRating()
            }
        };
    },

    onChooseA : function() {
        console.log("crime " + this.state.A.crime);
        console.log("education " + this.state.A.education);
        console.log("homesize " + this.state.A.homesize);
        console.log("commute " + this.state.A.commute);
        console.log("barsize " +  this.BAR_SIZE * 10 / 3);


    },

    onChooseB : function() {
        console.log("chooseB called");
        console.log("crime " + this.state.B.crime);
        console.log("education " + this.state.B.education);
        console.log("homesize " + this.state.B.homesize);
        console.log("commute " + this.state.B.commute);
        console.log("barsize " +  this.BAR_SIZE * 10 / 3);
    },
    //number from 0-30
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