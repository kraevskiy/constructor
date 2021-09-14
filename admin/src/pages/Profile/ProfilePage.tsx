import { Button, EditUserForm, PageHead, RegistrationForm } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../redux/actions';
import cls from './ProfilePage.module.scss';
import { useParams } from 'react-router-dom';
import { FunctionComponent, Suspense } from 'react';
import Loader from '../../components/Loader/Loader';
import { RootState } from '../../redux/rootReducer';

const components: {
	[key: string]: FunctionComponent
} = {
	index: EditUserForm,
	form: RegistrationForm
};

const ProfilePage = (): JSX.Element => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	console.log(user);
	const {slug} = useParams<{ slug: string | undefined }>();

	const GetComponentBySlug = (name: string): JSX.Element => {
		const MyName = components[name];
		return <MyName/>;
	};

	return (
		<div className="row">
			<PageHead>Profile Page</PageHead>
			<div className={cls.content}>
				<div className={cls.sidebar}>
					<div className={cls.user}>
						{user.login}
						<br/>
						{user.email}
					</div>
					{/*<NavLink to={paths.profile.form}>*/}
					{/*	form*/}
					{/*</NavLink>*/}
					{/*<NavLink to={paths.profile.index}>*/}
					{/*	index*/}
					{/*</NavLink>*/}
				</div>
				<div className={cls.body}>
					<Suspense fallback={<Loader/>}>
						{
							!slug ? <components.index/> : GetComponentBySlug(slug)
						}
					</Suspense>

					<Button onClick={() => dispatch(deleteUser())} color="red">
						Delete Account
					</Button>
				</div>
			</div>

		</div>
	);
};

export default ProfilePage;
