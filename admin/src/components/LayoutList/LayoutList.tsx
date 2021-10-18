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

interface LayoutListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	layouts: StateUserLayout[];
	isShowName?: boolean;
}

const LayoutList = ({layouts, isShowName = false}: LayoutListProps): JSX.Element => {
	const users = useSelector((state: RootState) => state.userAll);

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
		return `${user.login} - ${user.email}`;
	};

	return (
		<div className={cls.wrapper}>
			{layouts?.length
				? <>
					<Header
						titles={[isShowName ? 'Name / Username' : 'Name', 'Create', 'Update']}
					/>
					{
						layouts.map(l => (
							<Item
								key={l._id}
								userName={checkName(l.user)}
								title={l.title}
								id={l._id}
								handleDelete={deleteLayoutHandler}
								linkText="Open"
								deleteText="Delete"
								createdAt={l.createdAt}
								updatedAt={l.updatedAt}
							/>
						))
					}
				</>
				: <div className={cls.not_found}>
					<p>Don't have layouts</p>
					<NavLink
						to={paths.constructor}
						className="btn"
					>
						Create New
					</NavLink>
				</div>
			}
		</div>
	);
};


export default LayoutList;
