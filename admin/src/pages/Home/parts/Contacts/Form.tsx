import { useForm } from 'react-hook-form';
import { Input, Textarea, Button } from '../../../../components/';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cls from './Contacts.module.scss';
import { SchemaOf } from 'yup';

const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

interface IFormData {
	name: string;
	phone: string;
	email: string;
	message: string;
}

const schema: SchemaOf<IFormData> = yup.object().shape({
	name: yup.string().required().test('len', 'Must be exactly 3 characters', val => val?.length === 3),
	phone: yup.string().matches(phoneRegEx, 'Phone number is not valid').required(),
	email: yup.string().email().required(),
	message: yup.string().required().test('len', 'Must be exactly 5 characters', val => val?.length === 5),
});

const Form = (): JSX.Element => {
	const {register, handleSubmit, formState: {errors}} = useForm<IFormData>({
		resolver: yupResolver(schema)
	});

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
					{...register('name')}/>
			</label>
			<label className={cls.label}>
				<Input
					error={errors.phone}
					placeholder={t('form.phone')}
					{...register('phone')}/>
			</label>
			<label className={cls.label}>
				<Input
					error={errors.email}
					placeholder={t('form.email')}
					{...register('email')}/>
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
