import React, { Component } from 'react';
import inventory from '../assets/icons/backpack.svg';

import mob1 from '../assets/images/monster1.jpg';
import mob2 from '../assets/images/monster2.jpg';
import mob3 from '../assets/images/monster3.jpg';
import mob4 from '../assets/images/monster4.jpg';
import mob5 from '../assets/images/monster1.jpg';

import HealthPot from '../assets/icons/health-potion.svg';

// const itemList = [
// 	{

// 	},
// 	{

// 	}
// ]

const baseStat = JSON.parse(localStorage.getItem('characterBaseStats'));
const mobArray = [ mob1, mob2, mob3, mob4, mob5 ];
export default class GameStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backpackDisplay: 'none',
			lvl: 1,
			currentExp: 0,
			totalExp: 10,
			monsterCurrentHp: 10,
			monsterTotalHp: 10,
			currentStage: 1,
			hp: baseStat.hp,
			currentHP: baseStat.hp,
			// currentMonster: mobArray[this.state.currentStage - 1],
			retry: 'none',
			mp: baseStat.mp,
			str: baseStat.str,
			dex: baseStat.dex,
			int: baseStat.int,
			blinkRedDiv: '',
			ownBlinkDiv: '',
			monsterHiddenHp: 10,
			item1Img: '',
			item1Name: ''
		};
	}

	componentDidUpdate() {
		if (this.state.monsterHiddenHp <= 0) {
			this.delay = setTimeout(() => {
				let newMonsterHp = Math.ceil(this.state.monsterTotalHp * 1.35);
				let expGain = Math.ceil((this.state.currentStage + 4) * 2);
				let hpRegain = this.state.currentHP + this.state.currentStage + this.state.lvl + 2;
				let checkLvl = this.state.currentExp + expGain;
				const randomNumber = (max) => {
					return Math.floor(Math.random() * Math.floor(max));
				};
				let randomNumberResult = randomNumber(7);
				let newStage = this.state.currentStage + 1;
				console.log(newStage);
				console.log(randomNumberResult);
				if (randomNumberResult < 6) {
					this.setState({ item1Img: HealthPot, item1Name: 'HealthPot' });
				}
				if (checkLvl >= this.state.totalExp) {
					if (baseStat.talent === 'str') {
						let newTotalExp = Math.ceil(this.state.lvl + this.state.currentStage + this.state.totalExp);
						let newLvl = Math.ceil(this.state.lvl + 1);
						let newStr = this.state.str + 3;
						let newDex = this.state.dex + 1;
						let newInt = this.state.int + 1;
						let newHeroHp = this.state.hp + 4;
						let newMp = this.state.mp + 1;
						this.setState({
							currentHP: hpRegain,
							hp: newHeroHp,
							dex: newDex,
							str: newStr,
							int: newInt,
							mp: newMp,
							lvl: newLvl,
							totalExp: newTotalExp,
							currentExp: 0,
							monsterCurrentHp: newMonsterHp,
							monsterTotalHp: newMonsterHp,
							currentStage: newStage,
							monsterHiddenHp: newMonsterHp,
							ownBlinkDiv: 'start-ownHPGain'
						});
						console.log(this.state.currentStage);
					}
				} else {
					this.setState({
						currentStage: newStage,
						hp: hpRegain,
						currentExp: expGain,
						monsterCurrentHp: newMonsterHp,
						monsterTotalHp: newMonsterHp
					});
				}
			}, 1500);
			this.setState({ monsterHiddenHp: 1 });
		}

		if (this.state.currentHP <= 0) {
			this.setState({ retry: 'flex', currentHP: 1 });
		}
	}

	backpackClick = () => {
		this.setState({ backpackDisplay: 'flex' });
	};

	modoClose = () => {
		this.setState({ backpackDisplay: 'none' });
	};

	attackMonster = () => {
		let dmg = Math.ceil(this.state.str * 1.12);
		let monsterHpLeft = this.state.monsterCurrentHp - dmg;
		let heroHp = this.state.currentHP - this.state.currentStage * 2;
		this.setState({
			blinkRedDiv: 'start-monsterHPDiv',
			ownBlinkDiv: 'start-ownHPDiv'
		});
		this.monsterDelay = setTimeout(() => {
			this.setState({
				monsterCurrentHp: monsterHpLeft,
				monsterHiddenHp: monsterHpLeft
			});
		}, 500);
		this.delay = setTimeout(() => {
			this.setState({ currentHP: heroHp });
		}, 1500);
	};

	diedGame = () => {
		window.location.href = 'http://localhost:3000';
	};

	restartGame = () => {
		window.location.reload();
	};

	ownHPAnimationEnd = () => {
		this.setState({ ownBlinkDiv: '' });
	};
	monsterHPAnimationEnd = () => {
		this.setState({ blinkRedDiv: '' });
	};
	InvClick = () => {
		console.log('click');
		if (this.state.item1Name === 'HealthPot') {
			let ownHP = this.state.currentHP + 10;
			this.setState({ currentHP: ownHP, item1Name: '', item1Img: '' });
		}
	};
	render() {
		// console.log(baseStat);
		return (
			<div className="start">
				<header className="start-header" />
				<div className="start-statDiv">
					<h2 className="start-title">{baseStat.name}</h2>
					<div>
						<ul className="start-statList">
							<li>Talent: {baseStat.yourTalent}</li>
							<li>HP: {this.state.hp}</li>
							<li>MP: {this.state.mp}</li>
							<li>STR: {this.state.str}</li>
							<li>DEX: {this.state.dex}</li>
							<li>INT: {this.state.int}</li>
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
								<li>HP: {this.state.hp}</li>
								<li>MP: {this.state.mp}</li>
								<li>STR: {this.state.str}</li>
								<li>DEX: {this.state.dex}</li>
								<li>INT: {this.state.int}</li>
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
								<div className="start-modoInvBox">
									<img
										src={this.state.item1Img}
										alt=""
										className="start-modoInvBoxImg"
										onClick={this.InvClick}
									/>
								</div>
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
					<img className="start-monsterImgBlink" src={mobArray[this.state.currentStage - 1]} alt="monster" />
					<h3 className={this.state.blinkRedDiv} onAnimationEnd={this.monsterHPAnimationEnd}>
						HP: {this.state.monsterCurrentHp}/{this.state.monsterTotalHp}
					</h3>
				</div>
				<div className="start-actionDiv">
					<h3 className={this.state.ownBlinkDiv} onAnimationEnd={this.ownHPAnimationEnd}>
						HP:{this.state.currentHP}/{this.state.hp}
					</h3>
					<div className="start-expDiv">
						<h3>LVL: {this.state.lvl}</h3>

						<h3>
							EXP: {this.state.currentExp}/{this.state.totalExp}
						</h3>
					</div>

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
