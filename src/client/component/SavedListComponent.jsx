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
	onClickLater : function(itemData) {
		var self = this;
		return function() {
			self.props.onClickItem(itemData);
		};
	},

	/**
	 * Called when a item is removed
	 * @param  {number} key item index
	 */
	onRemoveItem : function(key) {
		this.props.onRemoveItem(key);
	},

    /**
     * Initalize the list
     */
    getInitialState : function() {
        return {};
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
						<SavedHomeComponent onRemoveHome={this.onRemoveItem} onClick={this.onClickLater(item)} key={i} data={item} />
					);
				}.bind(this))}
	        	</ul>
	        </div>
        );
	}
});

module.exports = SavedListComponent;