import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { hideLoader, showLoader } from '../../redux/app/appActions';
import React from 'react';
import { IEditUserFormInterface } from './EditUserForm.interface';
import { RootState } from '../../redux/rootReducer';
import { editUser } from '../../redux/user/userActions';

export const EditUserForm = (): JSX.Element => {
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm<IEditUserFormInterface>();
	const {user} = useSelector((state: RootState) => state.user);
	const handleSubmitForm = async (data: IEditUserFormInterface) => {
		dispatch(showLoader());
		dispatch(editUser(data));
		dispatch(hideLoader());
	};

	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<input
				{...register('email', {value: user.email})}
				type="text"
				placeholder={'email'}/>
			<br/>
			<input
				{...register('password')}
				type="text"
				placeholder={'password'}/>
			<br/>
			<input
				{...register('login', {value: user.login})}
				type="text"
				placeholder={'login'}/>
			<br/>
			<button>sub</button>
		</form>
	);
};
