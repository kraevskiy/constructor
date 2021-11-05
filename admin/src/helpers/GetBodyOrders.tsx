import { StateUserOrder } from '../redux/redux.types';
import cls from '../pages/OrderAll/OrderAllPage.module.scss';
import { BlockHead, OrderList } from '../components';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { editStatusOrder } from '../redux/orders/ordersActions';
import { getAllOrders } from '../redux/ordersAll/ordersAllActions';

interface GetBodyOrdersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	orders: StateUserOrder[];
}

export const GetBodyOrders = ({orders}: GetBodyOrdersProps): JSX.Element => {
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const handleAction = async (id: string, status: 'new' | 'progress' | 'completed'): Promise<void> => {
		await dispatch(editStatusOrder({id, status}));
		dispatch(getAllOrders({limit: 100}));
	};

	const getNewOrders = (newOrders: StateUserOrder[]) => {
		return (
			<div className={cls.typeWrapper}>
				<BlockHead>
					{t('order.new')}
				</BlockHead>
				<OrderList action={handleAction} orders={newOrders}/>
			</div>
		);
	};

	const getProgressOrders = (newOrders: StateUserOrder[]) => {
		return (
			<div className={cls.typeWrapper}>
				<BlockHead line="orange">
					{t('order.progress')}
				</BlockHead>
				<OrderList action={handleAction} orders={newOrders}/>
			</div>
		);
	};

	const getCompletedOrders = (newOrders: StateUserOrder[]) => {
		return (
			<div className={cls.typeWrapper}>
				<BlockHead line="green">
					{t('order.complete')}
				</BlockHead>
				<OrderList action={handleAction} orders={newOrders}/>
			</div>
		);
	};

	const getBody = () => {
		const listOrders: {
			[key in StateUserOrder['status']]: StateUserOrder[] | []
		} = {
			new: [],
			progress: [],
			completed: []
		};
		orders.forEach((o) => {
			const linkToArray: StateUserOrder[] = listOrders[o.status];
			return linkToArray.push(o);
		});
		return (
			<>
				{!!listOrders.new.length && getNewOrders(listOrders.new)}
				{!!listOrders.progress.length && getProgressOrders(listOrders.progress)}
				{!!listOrders.completed.length && getCompletedOrders(listOrders.completed)}
			</>
		);
	};

	return getBody();
};
