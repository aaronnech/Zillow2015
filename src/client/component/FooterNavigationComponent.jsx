var React = require('react');

/**
 * Encapsulates the header of the application
 */
var FooterNavigationComponent = React.createClass({
	/**
	 * Render the footer navigation
	 */
    render: function() {
        return (
	        <div id="footer-buttons">
	        	<ul className="nav">
				{this.props.buttons.map(function(button, i) {
					return (
						<li onClick={button.onClick} key={i} className={i==this.props.screen ? "active" : ""}>
							<img src={button.icon} />
						</li>
					);
				}.bind(this))}
	        	</ul>
	        </div>
        );
	}
});

module.exports = FooterNavigationComponent;