import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { hideLoader, showLoader } from '../../redux/actions';
import { deleteLayout } from '../../redux/actions';
import cls from './LayoutList.module.scss';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';
import Item from './Item/Item';
import Header from './Header/Header';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { StateUserLayout } from '../../redux/redux.types';
import { useTranslation } from 'react-i18next';

interface LayoutListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	layouts: StateUserLayout[];
	isShowName?: boolean;
}

const LayoutList = ({layouts, isShowName = false}: LayoutListProps): JSX.Element => {
	const users = useSelector((state: RootState) => state.userAll);
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const deleteLayoutHandler = async (id: string) => {
		dispatch(showLoader());
		await dispatch(deleteLayout(id));
		dispatch(hideLoader());
	};

	const checkName = (id: string | undefined) => {
		if (!isShowName) return null;
		const user = users.find(u => u._id === id);
		if (!user) return null;
		return `${user.login} / ${user.email}`;
	};

	return (
		<div className={cls.wrapper}>
			{layouts?.length
				? <>
					<Header
						titles={['Title/Login/Email', 'Create', 'Update']}
					/>
					{
						layouts.map(l => (
							<Item
								titles={['Title/ Login/ Email', 'Create', 'Update']}
								key={l._id}
								userName={checkName(l.user)}
								{...l}
								preview={'asdfa/asd.jpeg'}
								id={l._id}
								handleDelete={deleteLayoutHandler}
								linkText={t("order.view")}
								deleteText={t("order.delete")}
								addOrder={t("order.add")}
								{...l}
							/>
						))
					}
				</>
				: <div className={cls.not_found}>
					<p>{t('layout.dont')}</p>
					<NavLink
						to={paths.constructor}
						className="btn"
					>
						{t('layout.create')}
					</NavLink>
				</div>
			}
		</div>
	);
};


export default LayoutList;
