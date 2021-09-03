import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { hideLoader, showLoader } from '../../redux/actions';
import { deleteLayout } from '../../redux/actions';
import cls from './LayoutList.module.scss';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';
import Item from './Item/Item';
import Header from './Header/Header';

export const LayoutList = (): JSX.Element => {
	const layouts = useSelector((state: RootState) => state.layouts);
	const dispatch = useDispatch();

	const deleteLayoutHandler = async (id: string) => {
		dispatch(showLoader());
		await dispatch(deleteLayout(id));
		dispatch(hideLoader());
	};

	return (
		<div className={cls.wrapper}>
			{layouts?.length
				? <>
					<Header
						titles={['Name', 'Create', 'Update']}
					/>
					{
						layouts.map(l => (
							<Item
								key={l._id}
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
					<p>You don't have layouts</p>
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
