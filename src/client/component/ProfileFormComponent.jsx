var React = require('react');
var Constants = require('../Constants');

/**
 * Encapsulates the profile form
 */
var ProfileFormComponent = React.createClass({
    /**
     * Get the initial state
     */
    getInitialState : function() {
        return {
            showQuiz : false
        };
    },

    /**
     * Called when age is changed
     */
    onAgeChange : function(ev) {
        if (ev.target.validity.valid) {
            if (ev.target.value > 0) {
                this.props.data.setAge(ev.target.value);
            }
        }
    },

    /**
     * Called when salary is changed
     */
    onSalaryChange : function(ev) {
        if (ev.target.validity.valid) {
            if (ev.target.value > 0) {
                this.props.data.setSalary(ev.target.value);
            }
        }
    },

	/**
	 * Render the profile form
	 */
    render : function() {
    	var profile = this.props.data;

        return (
        	<div className="profile-form">
				<fieldset>
					<legend>The Basics</legend>
					<p><input type="number" className="salary" min="0" name="salary" onChange={this.onSalaryChange} placeholder="Salary (USD)" /></p>
					<p><input type="number" className="age" min="12" max="138" name="age" onChange={this.onAgeChange} placeholder="Age (yrs)" /></p>
				</fieldset>
				<fieldset>
					<legend>HomeQuiz</legend>
					<p style={{'display' : this.state.showQuiz ? 'none' : 'block'}}>Take a quick housing quiz</p>
					<p style={{'display' : this.state.showQuiz ? 'block' : 'none'}}>Tap which one you prefer</p>
				</fieldset>
        	</div>
        );
	}
});

module.exports = ProfileFormComponent;