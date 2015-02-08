var React = require('react');
var Constants = require('../Constants');

var QuizComponent = require('./QuizComponent.jsx');

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
     * Updates the profile in localstorage
     */
    updateLocalProfile : function() {
		var json = this.props.data.toJSON();
		window.localStorage.setItem('profile', JSON.stringify(json));
    },

    /**
     * Called when age is changed
     */
    onAgeChange : function(ev) {
        if (ev.target.validity.valid) {
            if (ev.target.value > 0) {
                this.props.data.setAge(ev.target.value);
                this.updateLocalProfile();
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
                this.updateLocalProfile();
            }
        }
    },

    /**
     * Called after component mounts
     */
    componentDidMount : function() {
        if (this.props.data.getSalary()) {
        	this.refs.salary.getDOMNode().value = this.props.data.getSalary();
        }

        if (this.props.data.getAge()) {
        	this.refs.age.getDOMNode().value = this.props.data.getAge();
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
					<div><input ref="salary" type="number" className="salary" min="0" name="salary" onChange={this.onSalaryChange} placeholder="Salary (USD)" /></div>
					<div><input ref="age" type="number" className="age" min="12" max="138" name="age" onChange={this.onAgeChange} placeholder="Age (yrs)" /></div>
				</fieldset>
				<fieldset>
					<legend>HomeQuiz</legend>
					<p style={{'display' : this.state.showQuiz ? 'none' : 'block'}}>
						Tell us about which homes you prefer <button onClick={(function() { this.setState({showQuiz : true}) }).bind(this)}>START</button>
					</p>
					<p style={{'display' : this.state.showQuiz ? 'block' : 'none'}}>Tap which one you prefer</p>
                    <div style={{'display' : this.state.showQuiz ? 'block' : 'none'}}>
                    	<QuizComponent style={{'margin': 'auto'}} profile={profile} updateLocalProfile={this.updateLocalProfile} />
                    </div>
				</fieldset>
        	</div>
        );
	}
});

module.exports = ProfileFormComponent;