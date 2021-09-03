import { LayoutList, PageHead } from '../../components';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';
import cls from './LayoutPage.module.scss';


const LayoutsPage = (): JSX.Element => {
	const {t} = useTranslation();

	return (
		<div className="row">
			<PageHead
				className={cls.head}
				text={t('layout.text')}
			>
				<span>{t('layout.title')}</span>
				<NavLink className="btn" to={paths.constructor}>
					Create new
				</NavLink>
			</PageHead>
			<LayoutList/>
		</div>
	);
};

export default LayoutsPage;
