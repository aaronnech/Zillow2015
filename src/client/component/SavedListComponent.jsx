var React = require('react');
var SavedHomeComponent = require('./SavedHomeComponent.jsx');

/**
 * Encapsulates the header of the application
 */
var SavedListComponent = React.createClass({
	/**
	 * Returns a thunk that will execute (later) the callback for clicking
	 * provided to this component with the argument.
	 * @param  {any} item The item to pass to the callback
	 * @return {Function} The thunk
	 */
	onClickLater : function(item) {
		var self = this;
		return function() {
			self.props.onClickItem(item);
		};
	},

    /**
     * Initalize the list
     */
    getInitialState : function() {
        return {
            data : this.props.data
        };
    },

	/**
	 * Render the saved list
	 */
    render: function() {
        return (
	        <div id="saved-list">
	        	<ul className="saved">
				{this.props.data.map(function(item, i) {
					return (
						<SavedHomeComponent onClick={this.onClickLater(item)} key={i} data={item} />
					);
				}.bind(this))}
	        	</ul>
	        </div>
        );
	}
});

module.exports = SavedListComponent;