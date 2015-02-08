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
     * Called when the component updates
     */
    componentDidUpdate: function() {
        this.updateLocalSavedHome();
    },

	/**
     * Updates the saved list in local storage
     */
    updateLocalSavedHome : function() {
        this.props.API.updateLocalSavedHome(this.props.data);
    },

	/**
	 * Called when a item is removed
	 * @param  {any} item to remove
	 */
	onRemoveItem : function(item) {
		this.props.onRemoveItem(item.props.index);
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
						<SavedHomeComponent profile={this.props.profile} onRemoveHome={this.onRemoveItem} onClickItem={this.onClickLater(item)} index={i} key={i} data={item} />
					);
				}.bind(this))}
	        	</ul>
	        </div>
        );
	}
});

module.exports = SavedListComponent;