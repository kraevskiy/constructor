import { LoginForm, PageHead } from '../../components';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import cls from './LoginPage.module.scss';

const LoginPage = (): JSX.Element => {
	const {t} = useTranslation();
	return (
		<div className={cn("container", cls.login)}>
			<PageHead paddingTop="small">{t('login.title')}</PageHead>
			<LoginForm/>
		</div>
	);
};

export default LoginPage;
