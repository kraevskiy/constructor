import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/app/appActions';
import { deleteOrders } from '../../redux/orders/ordersActions';
import { OrderListProps } from './OrderList.props';
import cls from './OrderList.module.scss';
import Header from './Header/Header';
import Item from './Item/Item';

export const OrderList = ({orders, typeAction, isShowName = false}: OrderListProps): JSX.Element => {
	const dispatch = useDispatch();

	const deleteOrderHandler = async (id: string) => {
		dispatch(showLoader());
		await dispatch(deleteOrders(id));
		await dispatch(hideLoader());
	};

	return (
		<div className={cls.wrapper}>
			<Header titles={['Order ID/Username', 'Create', 'Layouts']}/>
			{orders.map(o=>(
				<Item
					userName={o.user}
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
