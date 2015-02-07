var React = require('react');
var Constants = require('../Constants');
var API = require('../API');
var CardDeckComponent = require('./CardDeckComponent.jsx');
var HeaderComponent = require('./HeaderComponent.jsx');
var FooterNavigationComponent = require('./FooterNavigationComponent.jsx');
var SavedListComponent = require('./SavedListComponent.jsx');
var FilterFormComponent = require('./FilterFormComponent.jsx');

/**
 * Encapsulates the entire application
 */
var AppComponent = React.createClass({
	/**
	 * Returns a thunk that when executed will change the screen.
	 */
	setScreenLater : function(screen) {
        var self = this;
		return function() {
			self.setState({active : screen});
		};
	},

    /**
     * Initalize the application, setting it to the home screen
     */
    getInitialState : function() {
        return {
            active : Constants.SCREENS.HOME,
            savedHomes : [],
            API : new API(this.props.API, this.onRequestTimeout)
        };
    },

    onRequestTimeout : function() {
        console.log('API REQUEST TIMEOUT');
        // TODO: Show message, retry
    },

    /**
     * Called when a home is saved
     */
    onSaveHome : function(home) {
        this.setState({savedHomes : this.state.savedHomes.concat([home])});
    },

    /**
     * Render the application
     */
    render : function() {
        var isHome = (this.state.active == Constants.SCREENS.HOME);
        var isList = (this.state.active == Constants.SCREENS.LIST);
        var isSettings = (this.state.active == Constants.SCREENS.SETTINGS);
        var isProfile = (this.state.active == Constants.SCREENS.PROFILE);
        var isDetails = (this.state.active == Constants.SCREENS.DETAILS);

        var navButtons = [
            {
                icon : 'img/icon.house.png',
                onClick : this.setScreenLater(Constants.SCREENS.HOME)
            },
            {
                icon : 'img/icon.list.png',
                onClick : this.setScreenLater(Constants.SCREENS.LIST)
            },
            {
                icon : 'img/icon.settings.png',
                onClick : this.setScreenLater(Constants.SCREENS.SETTINGS)
            },
            {
                icon : 'img/icon.profile.png',
                onClick : this.setScreenLater(Constants.SCREENS.PROFILE)
            }
        ];

        return (
            <div id="app">
                <HeaderComponent screen={this.state.active} />
                <div className={"screen " + (isHome ? "active" : "")}>
                	<CardDeckComponent onSaveCard={this.onSaveHome} API={this.state.API} />
                </div>
                <div className={"screen " + (isList ? "active" : "")}>
                    <SavedListComponent data={this.state.savedHomes} />
                </div>
                <div className={"screen " + (isSettings ? "active" : "")}>
                    <FilterFormComponent />
                </div>
                <div className={"screen " + (isDetails ? "active" : "")}>

                </div>
                <div className={"screen " + (isProfile ? "active" : "")}>

                </div>
                <FooterNavigationComponent screen={this.state.active} buttons={navButtons} />
            </div>
        );
	}
});

module.exports = AppComponent;