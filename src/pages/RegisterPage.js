import React, { Component } from 'react';
//import AuthModal from '../components/auth/AuthModal';
import Register from '../containers/auth/Register';

class RegisterPage extends Component {
	render() {
		return <Register history={this.props.history}/>;
	}
}

export default RegisterPage;
