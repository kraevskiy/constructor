import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ILoginFormInterface } from './LoginForm.interface';
import { login, hideLoader, showLoader } from '../../redux/actions';
import { useTranslation } from 'react-i18next';
import { Input } from '../index';
import { Button } from './../';
import cls from './LoginForm.module.scss';
import { validate } from '../../helpers';

const LoginForm = (): JSX.Element => {
	const {t} = useTranslation();
	const dispatch = useDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<ILoginFormInterface>();

	const handleSubmitForm = async (data: ILoginFormInterface) => {
		dispatch(showLoader());
		dispatch(login(data));
		dispatch(hideLoader());
	};


	return (
		<form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
			<div className={cls.box}>
				<label htmlFor="exampleFormControlInput1" className="form-label">{t('login.email')}</label>
				<Input
					error={errors.email}
					{...register('email', {
						required: true,
						validate: value => validate.email(value)
					})}
					placeholder="name@example.com"
				/>
			</div>
			<div className={cls.box}>
				<label htmlFor="exampleFormControlInput1" className="form-label">{t('login.password')}</label>
				<Input
					error={errors.password}
					{...register('password', {
						required: true
					})}
					placeholder="*****"
				/>
			</div>
			<Button>{t('login.button')}</Button>
		</form>
	);
};

export default LoginForm;
