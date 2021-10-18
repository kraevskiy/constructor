import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IEditUserFormInterface } from './EditUserForm.interface';
import { RootState } from '../../redux/rootReducer';
import { editUser, hideLoader, showLoader } from '../../redux/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import cls from './EditUserForm.module.scss';
import { Button, Input } from '..';
import { SchemaOf } from 'yup';
import * as yup from 'yup';

const schema: SchemaOf<IEditUserFormInterface> = yup.object().shape({
	login: yup.string().required().test('len', 'Must be exactly 3 characters', val => val?.length === 5),
	email: yup.string().email().required(),
	password: yup.string().required().test('len', 'Must be exactly 5 characters', val => val?.length === 5),
});

const EditUserForm = (): JSX.Element => {
	const dispatch = useDispatch();
	const {register, handleSubmit, formState: {errors}, setValue} = useForm<IEditUserFormInterface>({
		resolver: yupResolver(schema)
	});

	const user = useSelector((state: RootState) => state.user);

	const handleSubmitForm = async (data: IEditUserFormInterface) => {
		dispatch(showLoader());
		dispatch(editUser(data));
		dispatch(hideLoader());
		setValue('password', '');
	};

	return (
		<div className={cls.wrapper}>
			<div className={cls.title}>
				Моя информация
			</div>
			<form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
				<div className={cls.box}>
					<Input
						error={errors.email}
						{...register('email', {value: user.email})}
						placeholder="name@example.com"
					/>
				</div>
				<div className={cls.box}>
					<Input
						error={errors.password}
						{...register('password')}
						placeholder="****"
					/>
				</div>
				<div className={cls.box}>
					<Input
						error={errors.login}
						{...register('login', {value: user.login})}
						placeholder="user"
					/>
				</div>
				<Button className={cls.button}>
					Edit
				</Button>
			</form>
		</div>
	);
};

export default EditUserForm;
