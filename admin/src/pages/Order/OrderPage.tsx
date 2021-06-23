import { OrderList } from '../../components';
import { useDispatch } from 'react-redux';
import { createOrders } from '../../redux/orders/ordersActions';

const OrdersPage = (): JSX.Element => {
	const dispatch = useDispatch();

	const addOrderSimple = async () => {
		await dispatch(createOrders({
			layouts: [
				{
					_id: 'asdasdasdasd',
					title: 'asdasd'
				}
			]
		}));
	};



	return (
		<div className="row">
			<h1 className="text-center col-12 mb-5">OrdersPage (logged)</h1>
			<OrderList/>
			<br/>
			<button className="btn btn-primary col-5 ms-auto" onClick={() => addOrderSimple()}>Add order</button>
		</div>
	);
};

export default OrdersPage;
