import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/app/appActions';
import { deleteOrders } from '../../redux/orders/ordersActions';
import { OrderListProps } from './OrderList.props';
import cls from './OrderList.module.scss';
import Header from './Header/Header';
import Item from './Item/Item';
import { RootState } from '../../redux/rootReducer';

const OrderList = ({orders, typeAction, isShowName = false}: OrderListProps): JSX.Element => {
	const users = useSelector((state: RootState) => state.userAll);
	const dispatch = useDispatch();

	const deleteOrderHandler = async (id: string) => {
		dispatch(showLoader());
		await dispatch(deleteOrders(id));
		await dispatch(hideLoader());
	};

	const checkName = (id: string) => {
		if (!isShowName) return null;
		const user = users.find(u => u._id === id);
		if (!user) return null;
		return `${user.login} - ${user.email}`;
	};

	return (
		<div className={cls.wrapper}>
			<Header titles={['Order ID/Username', 'Create', 'Layouts']}/>
			{orders.map(o => (
				<Item
					userName={checkName(o.user)}
					key={o._id}
					id={o._id}
					handleDelete={deleteOrderHandler}
					createdAt={o.createdAt}
					typeAction={typeAction}
					layouts={o.layouts}/>
			))}
		</div>
	);
};


export default OrderList;
