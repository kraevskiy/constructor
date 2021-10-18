import { PageHead, RegistrationForm } from '../../components';
import cn from 'classnames';
import cls from './RegistrationPage.module.scss';
import { useTranslation } from 'react-i18next';

const RegistrationPage = (): JSX.Element => {
	const {t} = useTranslation();
	return (
		<div className={cn("container", cls.registration)}>
			<PageHead paddingTop="small">{t('registration.title')}</PageHead>
			<RegistrationForm/>
		</div>
	);
};

export default RegistrationPage;
