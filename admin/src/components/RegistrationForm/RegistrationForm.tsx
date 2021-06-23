import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IRegistrationFormInterface } from './RegistrationForm.interface';
import { hideLoader, registrationUser, showLoader } from '../../redux/actions';
import { paths } from '../../routes/paths';
import { ActionType, RegisterUserModel } from '../../redux/redux.types';
import { TypesUser } from '../../redux/types';
import { useHistory } from 'react-router-dom';

export const RegistrationForm = (): JSX.Element => {
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm<IRegistrationFormInterface>();
	const history = useHistory();

	const handleSubmitForm = async (data: IRegistrationFormInterface) => {
		dispatch(showLoader());
		const user = await dispatch(registrationUser(data)) as unknown as ActionType<TypesUser, RegisterUserModel>;
		dispatch(hideLoader());
		if(user?.type === TypesUser.createUser) history.push(paths.login);
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
			<div className="mb-3">
				<label htmlFor="exampleFormControlInput1" className="form-label">Login</label>
				<input
					{...register('login')}
					type="text"
					className="form-control"
					placeholder="user"/>
			</div>
			<button className="btn btn-primary">Register</button>
		</form>
	);
};
