import React, { Component } from 'react';
import inventory from '../assets/icons/backpack.svg';

const baseStat = JSON.parse(localStorage.getItem('characterBaseStats'));

export default class GameStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backpackDisplay: 'none'
		};
	}

	backpackClick = () => {
		this.setState({ backpackDisplay: 'flex' });
	};

	render() {
		console.log(baseStat);

		return (
			<div className="start">
				<div className="start-statDiv">
					<h2 className="start-title">{baseStat.name}</h2>
					<div>
						<ul className="start-statList">
							<li>Talent: {baseStat.yourTalent}</li>
							<li>HP: {baseStat.hp}</li>
							<li>MP: {baseStat.mp}</li>
							<li>STR: {baseStat.str}</li>
							<li>DEX: {baseStat.dex}</li>
							<li>INT: {baseStat.int}</li>
						</ul>
					</div>
				</div>
				<div className="start-modoBackGround" style={{ display: this.state.backpackDisplay }}>
					<div className="start-popupModo">
						<ul>
							<li>Talent: {baseStat.yourTalent}</li>
							<li>HP: {baseStat.hp}</li>
							<li>MP: {baseStat.mp}</li>
							<li>STR: {baseStat.str}</li>
							<li>DEX: {baseStat.dex}</li>
							<li>INT: {baseStat.int}</li>
						</ul>
					</div>
				</div>
				<footer className="start-inventory">
					<img className="start-inventoryImg" src={inventory} onClick={this.backpackClick} alt="backpack" />
				</footer>
			</div>
		);
	}
}
