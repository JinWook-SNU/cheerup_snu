import React, { Component } from 'react';
//import AuthModal from '../components/auth/AuthModal';
import Login from '../containers/auth/Login';

class LoginPage extends Component {
	
	render() {
		return (
			<div>	

		<Login history={this.props.history}/>
		</div>
		);
	}
}

export default LoginPage;
