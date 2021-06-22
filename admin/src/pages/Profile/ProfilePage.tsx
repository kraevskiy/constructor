import React from 'react';
import { EditUserForm } from '../../components';

const ProfilePage = (): JSX.Element => {
	return (
		<div className="row">
			<h1 className="text-center col-12 mb-5">ProfilePage (logged)</h1>
			<EditUserForm />
		</div>
	);
};

export default ProfilePage;
