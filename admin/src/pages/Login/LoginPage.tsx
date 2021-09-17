import { LoginForm, PageHead } from '../../components';
import { useTranslation } from 'react-i18next';

const LoginPage = (): JSX.Element => {
	const {t} = useTranslation();
	return (
		<div className="row">
			<PageHead paddingTop="small">{t('login.title')}</PageHead>
			<LoginForm/>
		</div>
	);
};

export default LoginPage;
