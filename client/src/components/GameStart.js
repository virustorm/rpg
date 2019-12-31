import React, { Component } from 'react';
import inventory from '../assets/icons/backpack.svg';

import mob1 from '../assets/images/monster1.jpg';
import mob2 from '../assets/images/monster2.jpg';

const baseStat = JSON.parse(localStorage.getItem('characterBaseStats'));
const mobArray = [ mob1, mob2 ];
export default class GameStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backpackDisplay: 'none',
			lvl: 1,
			currentExp: 0,
			totalExp: 10,
			currentMonster: mobArray[0],
			monsterCurrentHp: 10,
			monsterTotalHp: 10,
			currentStage: 1,
			hp: baseStat.hp,
			currentHP: baseStat.hp,
			retry: 'none'
		};
	}

	componentDidUpdate() {
		if (this.state.monsterCurrentHp <= 0) {
			let newHp = Math.ceil(this.state.monsterTotalHp * 1.35);
			this.setState({
				monsterCurrentHp: newHp,
				monsterTotalHp: newHp,
				currentStage: this.state.currentStage + 1
			});
		}
		if (this.state.currentHP <= 0) {
			this.setState({ retry: 'flex', currentHP: 1 });
			console.log('somet');
		}
	}

	backpackClick = () => {
		this.setState({ backpackDisplay: 'flex' });
	};

	modoClose = () => {
		this.setState({ backpackDisplay: 'none' });
	};

	attackMonster = () => {
		let dmg = Math.ceil(baseStat.str * 1.12);
		let monsterHpLeft = this.state.monsterCurrentHp - dmg;
		console.log(dmg);
		console.log(monsterHpLeft);
		let heroHp = this.state.currentHP - this.state.currentStage * 2;
		this.setState({ monsterCurrentHp: monsterHpLeft, currentHP: heroHp });
	};

	diedGame = () => {
		window.location.href = 'http://localhost:3000';
	};

	restartGame = () => {
		window.location.reload();
		console.log('something');
	};

	render() {
		console.log(baseStat);

		return (
			<div className="start">
				<header className="start-header" />
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
						<button type="button" className="start-modoClose" onClick={this.modoClose}>
							X
						</button>
						<div className="start-modoStatDiv">
							<h1 className="start-modoStatTitle">Stats</h1>
							<ul className="start-modoStatList">
								<li>{baseStat.name}</li>
								<li>LV: {this.state.lvl}</li>
								<li className="start-modoLiExp">
									Exp: {this.state.currentExp}/{this.state.totalExp}
								</li>
								<li>Talent: {baseStat.yourTalent}</li>
								<li>HP: {baseStat.hp}</li>
								<li>MP: {baseStat.mp}</li>
								<li>STR: {baseStat.str}</li>
								<li>DEX: {baseStat.dex}</li>
								<li>INT: {baseStat.int}</li>
							</ul>
						</div>
						<div className="start-modoEquipDiv">
							<h1 className="start-modoEquipTitle">Equips</h1>
							<div className="start-modoEquipaDiv">
								<div>
									<div className="start-modoEquipBox start-modoEquipBox-1" />
									<div className="start-modoEquipBox start-modoEquipBox-2" />
								</div>
								<div>
									<div className="start-modoEquipBox start-modoEquipBox-3" />
									<div className="start-modoEquipBox start-modoEquipBox-4" />
								</div>
							</div>
						</div>
						<div className="start-modoInvDiv">
							<h1 className="start-modoInvTitle">Inventory</h1>
							<div className="start-modoInv">
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
								<div className="start-modoInvBox" />
							</div>
						</div>
					</div>
				</div>
				<div className="start-monsterDiv">
					<img src={this.state.currentMonster} alt="monster" />
					<h3>
						HP: {this.state.monsterCurrentHp}/{this.state.monsterTotalHp}
					</h3>
				</div>
				<div className="start-actionDiv">
					<h3>
						HP:{this.state.currentHP}/{this.state.hp}
					</h3>
					<button type="button" onClick={this.attackMonster}>
						Attack
					</button>
					<button type="button">Inventory</button>
					<button type="button">Magic</button>
				</div>
				<div className="start-BigRetryDiv" style={{ display: this.state.retry }}>
					<div className="start-retryDiv">
						<h3 className="start-retryTitle">you died</h3>
						<div className="start-retryButtonDiv">
							<button type="button" onClick={this.restartGame}>
								Restart
							</button>
							<button type="button" onClick={this.diedGame}>
								Die in vain
							</button>
						</div>
					</div>
				</div>

				<footer className="start-inventory">
					<img className="start-inventoryImg" src={inventory} onClick={this.backpackClick} alt="backpack" />
				</footer>
				<div className="start-footer" />
			</div>
		);
	}
}
