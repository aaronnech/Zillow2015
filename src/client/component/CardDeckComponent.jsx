var React = require('react');
var Hammer = require('hammerjs');
var JQuery = require('jquery');

var Home = require('../../common/model/Home');
var HomeBuilder = require('../../common/model/HomeBuilder');
var Constants = require('../Constants');

var CardFrontComponent = require('./CardFrontComponent.jsx');
var CardBackComponent = require('./CardBackComponent.jsx');

/**
 * Encapsulates the central card component of the application,
 * communicates with the given getCardApi property to get more card object
 * JSON representations.
 */
var CardDeckComponent = React.createClass({
	/**
	 * Initialize card deck listeners
	 */
	componentDidMount : function() {
		this.hammer = Hammer(this.getDOMNode())
		this.hammer.on('pan', this.drag);
		this.hammer.on('tap', this.doubleTap);
		this.hammer.on('panend', this.release);
		this.addMoreCardsToDeck();
	},

	/**
	 * Destroy listeners and unmount 
	 */
	componentWillUnmount : function() {
		this.hammer.off('pan', this.drag);
		this.hammer.off('panend', this.release);
	},

	/**
	 * Card swipe was successful. Get the next card below.
	 * @param {boolean} keep Whether to keep the current card or not
	 */
	nextCard : function(keep) {
		var activeCard = this.state.activeCard;
		if (keep) {
			this.props.onSaveCard(activeCard);
		}
		this.state.cards.splice(0,1);
		if(this.state.cards.length < 6) {
			this.addMoreCardsToDeck();
		}
		this.setState({ cards: this.state.cards});
		this.setState({ activeCardTransform: this.getCardPositionStyle(0,0,0)})
		this.setState({ activeCard: this.state.cards[0], showBack : false});
	},

	/**
	 * We are running low on cards, get more from the server
	 */
	addMoreCardsToDeck : function() {
		var self = this;
		this.props.API.getNextHomes(function(homes) {
			if (homes.length == 0) {
				setTimeout(self.addMoreCardsToDeck, 5000);
			} else {
				// Update state
				self.setState({cards : self.state.cards.concat(homes)});
				if (self.state.activeCard == undefined) {
					self.setState({activeCard : self.state.cards[0]});
				}
			}
		});
	},

	/**
	 * Called on card double click/tap
	 * @param  {any} ev Drag event object
	 */
	doubleTap : function(ev) {
		this.setState({showBack : !this.state.showBack});
	},

	/**
	 * Called on card release
	 * @param  {any} ev Drag event object
	 */
	release : function(ev) {
		if(Math.abs(ev.deltaX) > 300/3) {
			this.nextCard(this.state.showKeep);
		} else {
			this.setState({activeCardTransform : this.getCardPositionStyle(0,0,0)});
		}
		this.setState({showKeep : false });
		this.setState({showDiscard : false});
	},

	/**
	 * Called on drag update
	 * @param  {any} ev Drag event object
	 */
	drag : function(ev) {
		var deltaDragX = ev.deltaX;
		var deltaDragY = ev.deltaY;
		var rotation = 4;
		if(deltaDragX < 0) rotation = -4;
		if(deltaDragX < -70) {
			this.setState({showDiscard : true});
		} else {
			this.setState({showDiscard : false});
		}
		if(deltaDragX > 70) {
			this.setState({showKeep : true});
		} else {
			this.setState({showKeep : false});
		}
		this.setState({activeCardTransform : this.getCardPositionStyle(deltaDragX, deltaDragY, rotation, 1.03)});
	},

	/**
	 * Called to get initial card deck state
	 * @return {any} The initial card deck state
	 */
	getInitialState : function() {
		return {
			cards: [],
			activeCard : undefined,
			activeCardTransform : this.getCardPositionStyle(0,0,0),
			showDiscard : false,
			showKeep : false,
			showBack : false
		};
	},

	/**
	 * Gets the card position style for the current card
	 * @return {string} The style string
	 */
	getCardPositionStyle : function(xPos, yPos, rotation, scale) {
		if(!scale) scale = 1
			return 'translate3d(' + xPos +'px,' + yPos + 'px, 0) scale3d(' + scale + ',' + scale + ',1) rotate(' + rotation + 'deg)'
	},

	/**
	 * Renders the card deck
	 */
	render : function() {
		var revCards = this.state.cards.slice(0);
		revCards.reverse();


		return (
				<div id="card-deck">
				<ul className="card">
					{
						revCards.map(function(card, i) {
							var isActive = card == this.state.activeCard;

							return (
								<li key={i} className={isActive ? "active" : ""} style={isActive ? {"-webkit-transform": this.state.activeCardTransform} : {"-webkit-transform": this.getCardPositionStyle(0,0,0)}}>
									<div className="front" style={((!this.state.showBack && isActive) || !isActive) ? {'display' : 'block'} : {'display' : 'none'}}>
										<CardFrontComponent profile={this.props.profile} data={card} />
									</div>
									<div className="back" style={(isActive && this.state.showBack) ? {'display' : 'block'} : {'display' : 'none'}}>
										<CardBackComponent profile={this.props.profile} data={card} />
									</div>
									<div className="action keep" style={(this.state.showKeep && isActive) ? {'display' : 'block'} : {'display' : 'none'}}></div>
									<div className="action discard" style={(this.state.showDiscard && isActive) ? {'display' : 'block'} : {'display' : 'none'}}></div>
								</li>
							);
						}.bind(this))
					}
				</ul>
				</div>
			);
	}
});

module.exports = CardDeckComponent;