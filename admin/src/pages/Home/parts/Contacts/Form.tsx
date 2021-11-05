import { useForm } from 'react-hook-form';
import { Input, Textarea, Button } from '../../../../components/';
import { useTranslation } from 'react-i18next';
import cls from './Contacts.module.scss';
import { validate } from '../../../../helpers';

interface IFormData {
	name: string;
	phone: string;
	email: string;
	message: string;
}

const Form = (): JSX.Element => {
	const {register, handleSubmit, formState: {errors}} = useForm<IFormData>();

	const {t} = useTranslation();

	const handleSubmitForm = (data: IFormData) => {
		console.log(data);
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
			<Button>
				{t('form.send')}
			</Button>
		</form>
	);
};

export default Form;
