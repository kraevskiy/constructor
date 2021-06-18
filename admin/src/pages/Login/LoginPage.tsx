import React from 'react';
import { LoginForm } from '../../components';


const LoginPage = (): JSX.Element => {
	return (
		<div className="row">
			<h1 className="text-center col-12 mb-5">Login</h1>
			<LoginForm/>
		</div>
	);
};

export default LoginPage;
