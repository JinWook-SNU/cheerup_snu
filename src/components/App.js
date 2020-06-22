import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

class App extends Component {
	render() {
		return (
			<div>
				<p>아아아</p>
				<Route path="/login" component={LoginPage} />
				<Route path="/register" component={RegisterPage} />
			</div>
		);
	}
}

export default App;
