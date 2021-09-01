import { BlockHead, OrderList } from '../../components';
import { useDispatch } from 'react-redux';
import { createOrders } from '../../redux/orders/ordersActions';
import { PageHead } from '../../components/';
import { useTranslation } from 'react-i18next';

const OrdersPage = (): JSX.Element => {
	const dispatch = useDispatch();
	const {t} = useTranslation();

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
			<PageHead>
				OrdersPage (logged)
			</PageHead>
			<BlockHead>
				Мои новые заказы
			</BlockHead>
			<OrderList/>
			<br/>
			<button className="btn btn-primary col-5 ms-auto" onClick={() => addOrderSimple()}>Add order</button>
		</div>
	);
};

export default OrdersPage;
