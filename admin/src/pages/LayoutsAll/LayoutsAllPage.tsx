import { LayoutList, PageHead } from '../../components';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';
import cls from './LayoutAllPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';


const LayoutsAllPage = (): JSX.Element => {
	const layouts = useSelector((state: RootState) => state.layoutsAll);
	const {t} = useTranslation();

	return (
		<div className="container">
			<PageHead
				className={cls.head}
				text={t('layoutAll.text')}
			>
				<span>{t('layoutAll.title')}</span>
				<NavLink className="btn" to={paths.constructor}>
					{t('layout.create')}
				</NavLink>
			</PageHead>
			{
				layouts?.length
					? <LayoutList layouts={layouts[0].layouts} isShowName={true}/>
					: <p>{t('layout.dont')}</p>
			}
		</div>
	);
};

export default LayoutsAllPage;
