import { LoginForm } from '../../components';
import { useTranslation } from 'react-i18next';

const LoginPage = (): JSX.Element => {
	const {t} = useTranslation();
	return (
		<div className="row">
			<h1 className="text-center col-12 mb-5">{t('login.title')}</h1>
			<LoginForm/>
		</div>
	);
};

export default LoginPage;
