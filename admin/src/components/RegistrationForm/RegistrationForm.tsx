import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IRegistrationFormInterface } from './RegistrationForm.interface';
import { hideLoader, login, registrationUser, showLoader } from '../../redux/actions';
import { ActionType, RegisterUserModel } from '../../redux/redux.types';
import { TypesUser } from '../../redux/types';
import cls from './RegistrationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../';
import { validate } from '../../helpers';

const RegistrationForm = (): JSX.Element => {
	const {t} = useTranslation();
	const dispatch = useDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<IRegistrationFormInterface>();

	const handleSubmitForm = async (data: IRegistrationFormInterface) => {
		dispatch(showLoader());
		const user = await dispatch(registrationUser(data)) as unknown as ActionType<TypesUser, RegisterUserModel>;
		if(user?.payload?.createdAt){
			dispatch(login(data));
		}
		dispatch(hideLoader());
	};

	return (
		<form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
			<div className={cls.box}>
				<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
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
				<label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
				<Input
					error={errors.password}
					{...register('password', {
						required: true,
						validate: value => validate.text(value, 5)
					})}
					placeholder="*****"
				/>
			</div>
			<div className={cls.box}>
				<label htmlFor="exampleFormControlInput1" className="form-label">Login</label>
				<Input
					error={errors.login}
					{...register('login', {
						required: true,
						validate: value => validate.text(value, 3)
					})}
					placeholder="user"
				/>
			</div>
			<Button>{t('registration.button')}</Button>
		</form>
	);
};

export default RegistrationForm;
