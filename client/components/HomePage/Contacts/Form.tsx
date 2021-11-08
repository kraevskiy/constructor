import { useForm } from 'react-hook-form';
import { Input, Textarea, Button } from '../../';
import { useTranslation } from 'next-i18next';
import cls from './Contacts.module.scss';
import { useState } from 'react';
import { ResponseMail } from '../../../types/response-mail';
import axios from 'axios';
import { validate } from '../../../helpers/validation';
import { API } from '../../../helpers/api';
import {toast} from 'react-toastify';

interface IFormData {
	name: string;
	phone: string;
	email: string;
	message: string;
}


const Form = (): JSX.Element => {
	const {register, reset, handleSubmit, formState: {errors}} = useForm<IFormData>();
	const [loading, setLoading] = useState(false);

	const {t} = useTranslation();

	const handleSubmitForm = async (data: IFormData) => {
		setLoading(true);
		await axios.post<ResponseMail>(`${API.admin}${API.mail.message}`, data)
			.then(res => {
			setLoading(false);
			toast.success('👌 Success');
			reset();
		})
		.catch(errors => {
			toast.error(`😓 Error`);
			setLoading(false);
		});
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit(handleSubmitForm)} className={cls.form}>
			<label className={cls.label}>
				<Input
					error={errors.name}
					placeholder={t('form.name')}
					{...register('name', {
						required: true,
						validate: value => validate.text(value)
					})}/>
			</label>
			<label className={cls.label}>
				<Input
					error={errors.phone}
					placeholder={t('form.phone')}
					{...register('phone', {
						required: true,
						validate: value => validate.phone(value)
					})}/>
			</label>
			<label className={cls.label}>
				<Input
					error={errors.email}
					placeholder={t('form.email')}
					{...register('email', {
						required: true,
						validate: value => validate.email(value)
					})}/>
			</label>
			<label className={cls.label}>
				<Textarea
					error={errors.message}
					placeholder={t('form.message')}
					{...register('message')}/>
			</label>
			<Button disabled={loading}>
				{t('form.send')}
			</Button>
		</form>
	);
};

export default Form;
