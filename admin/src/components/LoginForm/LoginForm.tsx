import React from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ActionType, StateUser } from '../../redux/redux.types';
import { useForm } from 'react-hook-form';
import { ILoginFormInterface } from '../../pages/login/LoginForm.interface';
import { hideLoader, showLoader } from '../../redux/app/appActions';
import { autoLogin, login } from '../../redux/user/userActions';

export const LoginForm = (): JSX.Element => {
	const dispatch = useDispatch<ThunkDispatch<StateUser, null, ActionType>>();
	const {register, handleSubmit} = useForm<ILoginFormInterface>();

	const handleSubmitForm = async (data: ILoginFormInterface) => {
		dispatch(showLoader());
		await dispatch(login(data));
		dispatch(hideLoader());
	};


	return (
			<form onSubmit={handleSubmit(handleSubmitForm)}>
				<div onClick={()=> dispatch(autoLogin())}>asdasdasd</div>
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
