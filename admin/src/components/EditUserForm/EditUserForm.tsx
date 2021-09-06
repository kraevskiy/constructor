import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IEditUserFormInterface } from './EditUserForm.interface';
import { RootState } from '../../redux/rootReducer';
import { editUser, hideLoader, showLoader } from '../../redux/actions';
import cls from './EditUserForm.module.scss';
import { Button, Input } from '..';

const EditUserForm = (): JSX.Element => {
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm<IEditUserFormInterface>();
	const user = useSelector((state: RootState) => state.user);

	const handleSubmitForm = async (data: IEditUserFormInterface) => {
		dispatch(showLoader());
		dispatch(editUser(data));
		dispatch(hideLoader());
	};

	return (
		<div className={cls.wrapper}>
			<div className={cls.title}>
				Моя информация
			</div>
			<form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
				<div className={cls.box}>
					<Input
						{...register('email', {value: user.email})}
						placeholder="name@example.com"
					/>
				</div>
				<div className={cls.box}>
					<Input
						{...register('password')}
						placeholder="****"
					/>
				</div>
				<div className={cls.box}>
					<Input
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
