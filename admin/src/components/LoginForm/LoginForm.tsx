import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ILoginFormInterface } from './LoginForm.interface';
import { login, hideLoader, showLoader } from '../../redux/actions';
import { useTranslation } from 'react-i18next';

export const LoginForm = (): JSX.Element => {
	const {t} = useTranslation();
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm<ILoginFormInterface>();

	const handleSubmitForm = async (data: ILoginFormInterface) => {
		dispatch(showLoader());
		dispatch(login(data));
		dispatch(hideLoader());
	};


	return (
		<form className="col-md-6 m-auto" onSubmit={handleSubmit(handleSubmitForm)}>
			<div className="mb-3">
				<label htmlFor="exampleFormControlInput1" className="form-label">{t('login.email')}</label>
				<input
					{...register('email')}
					type="text"
					className="form-control"
					placeholder="name@example.com"/>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleFormControlInput1" className="form-label">{t('login.password')}</label>
				<input
					{...register('password')}
					type="text"
					className="form-control"
					placeholder="****"/>
			</div>
			<button className="btn btn-primary">{t('login.button')}</button>
		</form>
	);
};
