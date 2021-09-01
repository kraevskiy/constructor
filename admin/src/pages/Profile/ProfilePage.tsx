import { EditUserForm, PageHead } from '../../components';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/actions';

const ProfilePage = (): JSX.Element => {
	const dispatch = useDispatch();
	return (
		<div className="row">
			<PageHead>ProfilePage (logged)</PageHead>
			<EditUserForm />
			<button type="button" className="btn btn-danger" onClick={() => dispatch(deleteUser())}>Delete Account</button>
		</div>
	);
};

export default ProfilePage;
