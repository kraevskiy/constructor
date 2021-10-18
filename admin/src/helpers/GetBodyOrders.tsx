import { StateUserOrder } from '../redux/redux.types';
import cls from '../pages/OrderAll/OrderAllPage.module.scss';
import { BlockHead, OrderList } from '../components';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface GetBodyOrdersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	orders: StateUserOrder[];
	isShowName?: boolean;
}

export const GetBodyOrders = ({orders, isShowName = false}: GetBodyOrdersProps): JSX.Element => {

	const getNewOrders = (newOrders: StateUserOrder[]) => {
		return (
			<div className={cls.typeWrapper}>
				<BlockHead>
					New orders
				</BlockHead>
				<OrderList isShowName={isShowName} typeAction="delete" orders={newOrders}/>
			</div>
		);
	};

	const getProgressOrders = (newOrders: StateUserOrder[]) => {
		return (
			<div className={cls.typeWrapper}>
				<BlockHead line="orange">
					Orders in progress
				</BlockHead>
				<OrderList isShowName={isShowName} typeAction="progress" orders={newOrders}/>
			</div>
		);
	};

	const getCompletedOrders = (newOrders: StateUserOrder[]) => {
		return (
			<div className={cls.typeWrapper}>
				<BlockHead line="green">
					Completed orders
				</BlockHead>
				<OrderList isShowName={isShowName} orders={newOrders}/>
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
