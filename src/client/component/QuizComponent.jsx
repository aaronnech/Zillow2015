var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates the profile form
 */
var QuizComponent = React.createClass({
    /**
     * Get the initial state
     */
    getInitialState : function() {
        return {
            
        };
    },

    onChooseA : function() {

    },

    onChooseB : function() {
        this.props.profile.pushQuizResponse({
            'commute' : 0.4,
            'security' : 0.5,
            'education' : 0.8,
            'home size' : .2
        });
    },

	/**
	 * Render the profile form
	 */
    render : function() {
    	var profile = this.props.profile;
        console.log(this.props.foo);

        return (
        	<div className="quiz-component">
                <div onClick = {this.onChooseB()}
                style={{
                    "width": "50%",
                    "min-height": "100px",
                    "float": "left",
                    "border": "1px",
                    "background-color": "red"
                    }}>This is a rectangle!
                </div>
                <div style={{
                    "width": "50%",
                    "float": "left",
                    "min-height": "100px",
                    "border": "1px",
                    "background-color": "blue"
                    }}>This is another rectangle!
                </div>
				
        	</div>
        );
	}
});

module.exports = QuizComponent;