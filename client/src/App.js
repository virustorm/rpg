import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainBody from './components/MainBody';
import GameStart from './components/GameStart';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/" exact component={MainBody} />
				<Route path="/start" render={(props) => <GameStart {...props} />} />
			</Switch>
		</div>
	);
}

export default App;
