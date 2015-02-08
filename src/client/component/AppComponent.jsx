var React = require('react');
var Constants = require('../Constants');
var API = require('../API');

var Profile = require('../../common/model/Profile');

var CardDeckComponent = require('./CardDeckComponent.jsx');
var HeaderComponent = require('./HeaderComponent.jsx');
var FooterNavigationComponent = require('./FooterNavigationComponent.jsx');
var SavedListComponent = require('./SavedListComponent.jsx');
var FilterFormComponent = require('./FilterFormComponent.jsx');
var ProfileFormComponent = require('./ProfileFormComponent.jsx');
var ButterBarComponent = require('./ButterBarComponent.jsx');
var HomeDetailComponent = require('./HomeDetailComponent.jsx');

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
     * Get the user profile from local storage or begin a new one
     */
    getProfile : function() {
        var profileJson = JSON.parse(window.localStorage.getItem('profile'));
        if (profileJson) {
            return Profile.fromJSON(profileJson);
        }

        return new Profile();
    },

    /**
     * Initalize the application, setting it to the home screen
     */
    getInitialState : function() {
        var profile = this.getProfile();

        var api = new API(this.props.API, this.onRequestTimeout);
        api.setProfile(profile);

        return {
            active : Constants.SCREENS.HOME,
            detailHome : null,
            butter : null,
            savedHomes : api.getLocalSavedHome(),
            profile : profile,
            API : api
        };
    },

    /**
     * Called when the API times out
     */
    onRequestTimeout : function() {
        console.log('API REQUEST TIMEOUT');
    },

    /**
     * Called when a home is removed
     * @param  {number} key item index
     */
    onRemoveHome : function(key) {
        console.log(key);
        var homes = this.state.savedHomes.slice(0);
        homes.splice(key, 1);
        this.setState({savedHomes : homes});
    },

    /**
     * Sets the current home in the detail page, and switches to
     * that page
     * @param  {Home} home The saved home to detail
     */
    onHomeDetail : function(home) {
        this.setState({detailHome : home});
        this.setScreenLater(Constants.SCREENS.DETAILS)();
    },

    /**
     * Called when a home is saved
     */
    onSaveHome : function(home) {
        this.setState({savedHomes : this.state.savedHomes.concat([home])});
    },

    /**
     * Initialize
     */
    componentDidMount : function() {
        this.setState({butter : this.refs.butter});
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
                icon : 'img/icon.profile.png',
                onClick : this.setScreenLater(Constants.SCREENS.PROFILE)
            },
            {
                icon : 'img/icon.settings.png',
                onClick : this.setScreenLater(Constants.SCREENS.SETTINGS)
            }
        ];

        return (
            <div id="app">
                <HeaderComponent screen={this.state.active} />
                <div className={"screen " + (isHome ? "active" : "")}>
                    <ButterBarComponent ref="butter" API={this.state.API} />
                	<CardDeckComponent butter={this.state.butter} onSaveCard={this.onSaveHome} API={this.state.API} profile={this.state.profile} />
                </div>
                <div className={"screen " + (isList ? "active" : "")}>
                    <SavedListComponent API={this.state.API} profile={this.state.profile} onClickItem={this.onHomeDetail} onRemoveItem={this.onRemoveHome} data={this.state.savedHomes} />
                </div>
                <div className={"screen " + (isSettings ? "active" : "")}>
                    <FilterFormComponent API={this.state.API} />
                </div>
                <div className={"screen " + (isDetails ? "active" : "")}>
                    <HomeDetailComponent profile={this.state.profile} data={this.state.detailHome} />
                </div>
                <div className={"screen " + (isProfile ? "active" : "")}>
                    <ProfileFormComponent data={this.state.profile} />
                </div>
                <FooterNavigationComponent screen={this.state.active} buttons={navButtons} />
            </div>
        );
	}
});

module.exports = AppComponent;