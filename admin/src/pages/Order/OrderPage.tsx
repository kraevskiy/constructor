import { useDispatch, useSelector } from 'react-redux';
import { createOrders } from '../../redux/orders/ordersActions';
import { PageHead } from '../../components/';
import { RootState } from '../../redux/rootReducer';
import { useTranslation } from 'react-i18next';
import { GetBodyOrders } from '../../helpers';

const OrdersPage = (): JSX.Element => {
	const orders = useSelector((state: RootState) => state.orders);
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
		<div className="container">
			<PageHead>
				{t('order.title')}
			</PageHead>
			{
				orders?.length
					? <GetBodyOrders orders={orders}/>
					: <p>You don't have orders</p>
			}
			<br/>
			<button className="btn btn-primary col-5 ms-auto" onClick={() => addOrderSimple()}>Add order</button>
		</div>
	);
};

export default OrdersPage;
