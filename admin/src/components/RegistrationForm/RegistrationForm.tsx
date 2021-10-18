import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IRegistrationFormInterface } from './RegistrationForm.interface';
import { hideLoader, registrationUser, showLoader } from '../../redux/actions';
import { paths } from '../../routes/paths';
import { ActionType, RegisterUserModel } from '../../redux/redux.types';
import { TypesUser } from '../../redux/types';
import { useHistory } from 'react-router-dom';
import cls from './RegistrationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../';
import { SchemaOf } from 'yup';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema: SchemaOf<IRegistrationFormInterface> = yup.object().shape({
	login: yup.string().required().test('len', 'Must be exactly 3 characters', val => val?.length === 5),
	email: yup.string().email().required(),
	password: yup.string().required().test('len', 'Must be exactly 5 characters', val => val?.length === 5),
});

const RegistrationForm = (): JSX.Element => {
	const {t} = useTranslation();
	const dispatch = useDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<IRegistrationFormInterface>({
		resolver: yupResolver(schema)
	});
	const history = useHistory();

	const handleSubmitForm = async (data: IRegistrationFormInterface) => {
		dispatch(showLoader());
		const user = await dispatch(registrationUser(data)) as unknown as ActionType<TypesUser, RegisterUserModel>;
		dispatch(hideLoader());
		if(user?.type === TypesUser.createUser) history.push(paths.login);
	};

	return (
		<form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
			<div className={cls.box}>
				<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
				<Input
					error={errors.email}
					{...register('email')}
					placeholder="name@example.com"
				/>
			</div>
			<div className={cls.box}>
				<label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
				<Input
					error={errors.password}
					{...register('password')}
					placeholder="*****"
				/>
			</div>
			<div className={cls.box}>
				<label htmlFor="exampleFormControlInput1" className="form-label">Login</label>
				<Input
					error={errors.login}
					{...register('login')}
					placeholder="user"
				/>
			</div>
			<Button>{t('registration.button')}</Button>
		</form>
	);
};

export default RegistrationForm;
