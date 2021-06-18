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
		<form className="col-md-6 m-auto" onSubmit={handleSubmit(handleSubmitForm)}>
			<div className="mb-3">
				<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
				<input
					{...register('email')}
					type="text"
					className="form-control"
					placeholder="name@example.com"/>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
				<input
					{...register('password')}
					type="text"
					className="form-control"
					placeholder="****"/>
			</div>
			<button className="btn btn-primary">Login</button>
		</form>
);
};
