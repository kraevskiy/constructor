import { OrderListProps } from './OrderList.props';
import cls from './OrderList.module.scss';
import Header from './Header/Header';
import Item from './Item/Item';
import { useTranslation } from 'react-i18next';

const OrderList = ({orders, action}: OrderListProps): JSX.Element => {
	const {t} = useTranslation();

	const COLUMNS_NAME = [
		t('order.name'),
		t('order.number'),
		t('order.price'),
		t('order.count'),
		t('order.allPrice'),
		t('user.address')];

	return (
		<div className={cls.wrapper}>
			<Header titles={COLUMNS_NAME}/>
			{orders.map(o => (
				<Item
					titles={COLUMNS_NAME}
					{...o}
					key={o._id}
					id={o._id}
					action={action}
				/>
			))}
		</div>
	);
};


export default OrderList;
