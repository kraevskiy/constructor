import React from 'react';
import { EditUserForm } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

const ProfilePage = (): JSX.Element => {
	const {user} = useSelector((state: RootState) => state.user);

	return (
		<div>
			<p>user.login - {user.login}</p>
			<p>user.email - {user.email}</p>
			ProfilePage (logged)
			<EditUserForm />
		</div>
	);
};

export default ProfilePage;
