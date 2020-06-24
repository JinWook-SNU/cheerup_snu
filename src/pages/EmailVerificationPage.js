import React, { Component } from 'react';
//import AuthModal from '../components/auth/AuthModal';
import EmailVerification from '../containers/EmailVerification';

class EmailVerificationPage extends Component {
	
	render() {
		return (
			<div>	
		  <EmailVerification history={this.props.history}/>
		</div>
		);
	}
}

export default EmailVerificationPage;
