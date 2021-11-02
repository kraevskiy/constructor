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
					: <p>{t('order.dont')}</p>
			}
			<br/>
			<button className="btn" onClick={() => addOrderSimple()}>Add order</button>
		</div>
	);
};

export default OrdersPage;
