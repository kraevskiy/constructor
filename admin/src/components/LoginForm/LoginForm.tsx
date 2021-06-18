import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ILoginFormInterface } from './LoginForm.interface';
import { hideLoader, showLoader } from '../../redux/app/appActions';
import { login } from '../../redux/user/userActions';

export const LoginForm = (): JSX.Element => {
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm<ILoginFormInterface>();

	const handleSubmitForm = async (data: ILoginFormInterface) => {
		dispatch(showLoader());
		await dispatch(login(data));
		dispatch(hideLoader());
	};


	return (
			<form onSubmit={handleSubmit(handleSubmitForm)}>
				<input
					{...register('email')}
					type="text"
					placeholder={'em'}/>

				<input
					{...register('password')}
					type="text"
					placeholder={'pass'}/>
				<button>sub</button>
			</form>
	);
};
