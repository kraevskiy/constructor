import { useForm } from 'react-hook-form';
import { IRegistrationFormInterface } from './RegistrationForm.interface';
import cls from './RegistrationForm.module.scss';
import { useTranslation } from 'next-i18next';
import { Button, Input } from '../';
import { SchemaOf } from 'yup';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PageHead } from '../';
import cn from 'classnames';

const schema: SchemaOf<IRegistrationFormInterface> = yup.object().shape({
	login: yup.string().required().test('len', 'Must be exactly 3 characters', val => val?.length === 5),
	email: yup.string().email().required(),
	password: yup.string().required().test('len', 'Must be exactly 5 characters', val => val?.length === 5),
});

export const RegistrationForm = (): JSX.Element => {
	const {t} = useTranslation();
	const {register, handleSubmit, formState: {errors}} = useForm<IRegistrationFormInterface>({
		resolver: yupResolver(schema)
	});

	const handleSubmitForm = async (data: IRegistrationFormInterface) => {
		console.log(data);
	};

	return (
		<div className={cn("container", cls.registration)}>
			<PageHead paddingTop="small">{t('registration.title')}</PageHead>
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
		</div>
	);
};
