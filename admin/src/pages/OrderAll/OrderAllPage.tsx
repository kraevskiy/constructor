import { useSelector } from 'react-redux';
import { PageHead } from '../../components/';
import { RootState } from '../../redux/rootReducer';
import { useTranslation } from 'react-i18next';
import { GetBodyOrders } from '../../helpers/';

const OrderAllPage = (): JSX.Element => {
	const orders = useSelector((state: RootState) => state.ordersAll);
	const {t} = useTranslation();

	return (
		<div className="container">
			<PageHead>
				{t('orderAll.title')}
			</PageHead>
			{
				orders?.length
					? <GetBodyOrders orders={orders[0].orders}/>
					: <p>{t('order.dont')}</p>
			}
			<br/>
		</div>
	);
};

export default OrderAllPage;
