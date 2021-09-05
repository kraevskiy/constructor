import { LayoutList, PageHead } from '../../components';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';
import cls from './LayoutAllPage.module.scss';


const LayoutsAllPage = (): JSX.Element => {
	const {t} = useTranslation();

	return (
		<div className="row">
			<PageHead
				className={cls.head}
				text={t('layoutAll.text')}
			>
				<span>{t('layoutAll.title')}</span>
				<NavLink className="btn" to={paths.constructor}>
					Create new
				</NavLink>
			</PageHead>
			<LayoutList/>
		</div>
	);
};

export default LayoutsAllPage;
