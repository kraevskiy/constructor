import { PageHead, RegistrationForm } from '../../components';

const RegistrationPage = (): JSX.Element => {
	return (
		<div className="container">
			<PageHead paddingTop="small">RegistrationPage</PageHead>
			<RegistrationForm/>
		</div>
	);
};

export default RegistrationPage;
