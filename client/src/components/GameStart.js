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

	modoClose = () => {
		this.setState({ backpackDisplay: 'none' });
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
						<button type="button" className="start-modoClose" onClick={this.modoClose}>
							X
						</button>
						<div className="start-modoStatDiv">
							<h1 className="start-modoStatTitle">Stats</h1>
							<ul className="start-modoStatList">
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
				<footer className="start-inventory">
					<img className="start-inventoryImg" src={inventory} onClick={this.backpackClick} alt="backpack" />
				</footer>
			</div>
		);
	}
}
