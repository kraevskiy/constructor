import { EditUserForm } from '../../components';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/actions';

const ProfilePage = (): JSX.Element => {
	const dispatch = useDispatch();
	return (
		<div className="row">
			<h1 className="text-center col-12 mb-5">ProfilePage (logged)</h1>
			<EditUserForm />
			<button type="button" className="btn btn-danger" onClick={() => dispatch(deleteUser())}>Delete Account</button>
		</div>
	);
};

export default ProfilePage;
