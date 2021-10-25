import { useForm } from 'react-hook-form';
import { ILoginFormInterface } from './LoginForm.interface';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../index';
import { Button } from './../';
import cls from './LoginForm.module.scss';
import { PageHead } from '../';
import cn from 'classnames';

const schema: yup.SchemaOf<ILoginFormInterface> = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required().test('len', 'Must be exactly 5 characters', val => val?.length === 5),
});

export const LoginForm = (): JSX.Element => {
	const {t} = useTranslation();
	const {register, handleSubmit, formState: {errors}} = useForm<ILoginFormInterface>({
		resolver: yupResolver(schema)
	});

	const handleSubmitForm = async (data: ILoginFormInterface) => {
		console.log(data);
	};


	return (
		<div className={cn("container", cls.login)}>
			<PageHead paddingTop="small">{t('login.title')}</PageHead>
			<form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
				<div className={cls.box}>
					<label htmlFor="exampleFormControlInput1" className="form-label">{t('login.email')}</label>
					<Input
						error={errors.email}
						{...register('email')}
						placeholder="name@example.com"
					/>
				</div>
				<div className={cls.box}>
					<label htmlFor="exampleFormControlInput1" className="form-label">{t('login.password')}</label>
					<Input
						error={errors.password}
						{...register('password')}
						placeholder="*****"
					/>
				</div>
				<Button>{t('login.button')}</Button>
			</form>
		</div>
	);
};
