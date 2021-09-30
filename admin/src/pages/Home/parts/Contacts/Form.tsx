import { useForm } from 'react-hook-form';
import { Input, Textarea, Button } from '../../../../components/';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cls from './Contacts.module.scss';

const schema = yup.object().shape({
	name: yup.string().required(),
	phone: yup.string().required(),
	email: yup.string().required(),
	message: yup.string().required(),
});

interface IFormData {
	name: string;
	phone: string;
	email: string;
	message: string;
}

const Form = (): JSX.Element => {
	const {register, handleSubmit} = useForm<IFormData>({
		// resolver: yupResolver(schema)
	});
	const {t} = useTranslation();

	const handleSubmitForm = (data: IFormData) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(handleSubmitForm)} className={cls.form}>
			<label className={cls.label}>
				<Input
					placeholder={t('form.name')}
					{...register('name')}/>
			</label>
			<label className={cls.label}>
				<Input
					placeholder={t('form.phone')}
					{...register('phone')}/>
			</label>
			<label className={cls.label}>
				<Input
					placeholder={t('form.email')}
					{...register('email')}/>
			</label>
			<label className={cls.label}>
				<Textarea
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
