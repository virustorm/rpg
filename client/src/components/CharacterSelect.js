import React, { Component } from 'react';
// import stickman from '../assets/images/stickman.jpeg';
import strong from '../assets/icons/strong.svg';
import archery from '../assets/icons/archery-target.svg';
import int from '../assets/icons/maze-saw.svg';
import shield from '../assets/icons/shield.svg';

export default class MainBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasSelectName: false,
			name: '',
			hp: 10,
			mp: 5,
			str: 3,
			dex: 3,
			int: 3,
			talent: '',
			areYouSureDisplay: 'hidden',
			yourTalent: ''
		};
	}

	nameSubmit = () => {
		this.setState({
			hasSelectName: true,
			name: this.name.value
		});
	};

	strTalent = () => {
		this.setState({
			talent: 'str',
			hp: 12,
			mp: 5,
			str: 4,
			dex: 3,
			int: 3,
			areYouSureDisplay: 'visible',
			yourTalent: 'Strong'
		});
	};

	intTalent = () => {
		this.setState({
			talent: 'int',
			hp: 10,
			mp: 7,
			str: 3,
			dex: 3,
			int: 4,
			areYouSureDisplay: 'visible',
			yourTalent: 'Smartness'
		});
	};

	dexTalent = () => {
		this.setState({
			talent: 'dex',
			hp: 10,
			mp: 5,
			str: 3,
			dex: 4,
			int: 3,
			areYouSureDisplay: 'visible',
			yourTalent: 'Keen Eyes'
		});
	};

	defTalent = () => {
		this.setState({
			talent: 'def',
			hp: 15,
			mp: 5,
			str: 3,
			dex: 3,
			int: 3,
			areYouSureDisplay: 'visible',
			yourTalent: 'Tank'
		});
	};

	yesTalent = () => {
		window.location.href = 'http://localhost:3000/start';
		localStorage.setItem('characterBaseStats', JSON.stringify(this.state));
	};

	noTalent = () => {
		this.setState({ areYouSureDisplay: 'hidden' });
	};

	render() {
		if (!this.state.hasSelectName) {
			return (
				<div className="charSelect">
					<h3 className="charSelect-title">What is your name?</h3>
					<input
						type="text"
						className="charSelect-input"
						ref={(ref) => {
							this.name = ref;
						}}
					/>
					<button type="submit" onClick={this.nameSubmit}>
						Confirm
					</button>
				</div>
			);
		} else if (this.state.hasSelectName) {
			return (
				<div className="statSelect">
					<div className="statSelect-left">
						<h1 className="statSelect-hi">Hi {this.state.name}</h1>
						<div className="statSelect__statDiv">
							<h3>This is your Stats</h3>
							<ul className="statSelect__statDiv-ul">
								<li className="statSelect__statDiv-li">hp: {this.state.hp}</li>
								<li className="statSelect__statDiv-li">mp: {this.state.mp}</li>
								<li className="statSelect__statDiv-li">str: {this.state.str}</li>
								<li className="statSelect__statDiv-li">dex: {this.state.dex}</li>
								<li className="statSelect__statDiv-li">int: {this.state.int}</li>
							</ul>
						</div>
					</div>
					<div className="statSelect-buttonDiv" style={{ visibility: this.state.areYouSureDisplay }}>
						<h2>Your talent is {this.state.yourTalent}</h2>
						<div className="statSelect-button">
							<button type="submit" onClick={this.yesTalent}>
								Confirm
							</button>
							<button type="submit" onClick={this.noTalent}>
								Not this one
							</button>
						</div>
					</div>
					<div>
						<h3>Choose a talent</h3>
						<div className="statSelect__overall">
							<div className="statSelect__talentDiv" onClick={this.strTalent}>
								<img className="statSelect__talent" src={strong} alt="strong" />
								<div className="statSelect__talent-overlay">
									<div className="statSelect__talent-info">You are super buffed +1Str/lv +2HP/lv</div>
								</div>
							</div>
							<div className="statSelect__talentDiv" onClick={this.dexTalent}>
								<img className="statSelect__talent" src={archery} alt="archery" />
								<div className="statSelect__talent-overlay">
									<div className="statSelect__talent-info">You have keen eyes +1Dex/lv</div>
								</div>
							</div>
							<div className="statSelect__talentDiv" onClick={this.intTalent}>
								<img className="statSelect__talent" src={int} alt="magic" />
								<div className="statSelect__talent-overlay">
									<div className="statSelect__talent-info">
										You are insanely smart +1Int/lv +2MP/lv
									</div>
								</div>
							</div>
							<div className="statSelect__talentDiv" onClick={this.defTalent}>
								<img className="statSelect__talent" src={shield} alt="shield" />
								<div className="statSelect__talent-overlay">
									<div className="statSelect__talent-info">You are super buffed +3HP/lv</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
