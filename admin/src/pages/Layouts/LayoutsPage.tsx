import { LayoutList, PageHead } from '../../components';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';
import cls from './LayoutPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

const LayoutsPage = (): JSX.Element => {
	const layouts = useSelector((state: RootState) => state.layouts);
	const {t} = useTranslation();

	return (
		<div className="container">
			<PageHead
				className={cls.head}
				text={t('layout.text')}
			>
				<span>{t('layout.title')}</span>
				<NavLink className="btn" to={paths.constructor}>
					Create new
				</NavLink>
			</PageHead>
			{
				layouts?.length
					? <LayoutList layouts={layouts}/>
					: <p>Don't have layouts</p>
			}
		</div>
	);
};

export default LayoutsPage;
