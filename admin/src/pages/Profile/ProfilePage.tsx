import { Button, InputLabel, PageHead } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUser, hideLoader, showLoader } from '../../redux/actions';
import cls from './ProfilePage.module.scss';
import { FormEvent, useState } from 'react';
import { RootState } from '../../redux/rootReducer';
import { userIcon } from '../../images';
import Axios from '../../helpers/Axios';
import { TypeResponseUpload } from '../../components/InputFile/InputFile';
import { validate } from '../../helpers';
import { useForm } from 'react-hook-form';
import { IEditUserFormInterface } from './EditUserForm.interface';
import { useTranslation } from 'react-i18next';

const ProfilePage = (): JSX.Element => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	const [avatar, setAvatar] = useState<string>(user.avatar);
	const {register, handleSubmit, formState: {errors, isDirty}, setValue} = useForm<IEditUserFormInterface>();
	const {t} = useTranslation();

	const handleSubmitForm = async (data: IEditUserFormInterface) => {
		dispatch(showLoader());
		dispatch(editUser(data));
		dispatch(hideLoader());
		setValue('password', '');
	};

	const handleUpload = async (e: FormEvent<HTMLInputElement>) => {
		const formData = new FormData();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		formData.append('files', e.target.files[0]);
		const res = await Axios.post<TypeResponseUpload[]>(`${process.env.REACT_APP_FILES_AVATAR}`, formData);
		setAvatar(res.data[0].url);
		dispatch(editUser({avatar: res.data[0].url}));
	};

	return (
		<div className="container">
			<PageHead>{t('profile.title')}</PageHead>
			<div className={cls.content}>
				<div className={cls.sidebar}>
					<div className={cls.user}>
						<div className={cls.avatar}>
							<img
								src={avatar}
								onError={() => {
									setAvatar(userIcon);
								}}
								alt={user.login}/>

							<span className={cls.plus}>
								<input
									onChange={handleUpload}
									type="file"/>
								+
							</span>
						</div>
						{user.login}
						<br/>
						{user.email}
					</div>
				</div>
				<div className={cls.body}>
					<div className={cls.wrapper}>
						<div className={cls.title}>
							{t('user.information')}
						</div>
						<form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
							<div className={cls.box}>
								<InputLabel
									text={t('login.email')}
									error={errors.email}
									{...register('email', {
										value: user.email,
										validate: value => validate.email(value)
									})}
									placeholder="name@example.com"
								/>
							</div>
							<div className={cls.box}>
								<InputLabel
									text={t('login.password')}
									error={errors.password}
									{...register('password', {
										required: false
									})}
									placeholder="****"
								/>
							</div>
							<div className={cls.box}>
								<InputLabel
									text={t('user.login')}
									error={errors.login}
									{...register('login', {
										value: user.login,
										validate: value => validate.login(value)
									})}
									placeholder="user"
								/>
							</div>
							<div className={cls.box}>
								<InputLabel
									text={t('user.address')}
									error={errors.address}
									{...register('address', {
										value: user.address,
										validate: value => validate.text(value)
									})}
									placeholder="address"
								/>
							</div>
							<div className={cls.box}>
								<InputLabel
									text={t('user.firstName')}
									error={errors.firstName}
									{...register('firstName', {
										value: user.firstName,
										validate: value => validate.text(value)
									})}
									placeholder="firstName"
								/>
							</div>
							<div className={cls.box}>
								<InputLabel
									text={t('user.lastName')}
									error={errors.lastName}
									{...register('lastName', {
										value: user.lastName,
										validate: value => validate.text(value)
									})}
									placeholder="lastName"
								/>
							</div>
							<div className={cls.box}>
								<InputLabel
									text={t('user.phone')}
									error={errors.phone}
									{...register('phone', {
										value: user.phone,
										validate: value => validate.phone(value)
									})}
									placeholder="0980999999"
								/>
							</div>
							<Button disabled={!isDirty} className={cls.button}>
								{t('user.save')}
							</Button>
						</form>
					</div>
					<Button onClick={() => dispatch(deleteUser())} color="red">
						{t('profile.delete')}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
