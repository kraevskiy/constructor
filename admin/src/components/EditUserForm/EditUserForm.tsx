import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IEditUserFormInterface } from './EditUserForm.interface';
import { RootState } from '../../redux/rootReducer';
import { editUser, hideLoader, showLoader } from '../../redux/actions';

export const EditUserForm = (): JSX.Element => {
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm<IEditUserFormInterface>();
	const user = useSelector((state: RootState) => state.user);

	const handleSubmitForm = async (data: IEditUserFormInterface) => {
		dispatch(showLoader());
		dispatch(editUser(data));
		dispatch(hideLoader());
	};

	return (
		<form className="col-md-6 m-auto" onSubmit={handleSubmit(handleSubmitForm)}>
			<div className="mb-3">
				<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
				<input
					{...register('email', {value: user.email})}
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
				<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
				<input
					{...register('login', {value: user.login})}
					type="text"
					className="form-control"
					placeholder="user"/>
			</div>
			<button className="btn btn-primary">Edit</button>
		</form>
	);
};
