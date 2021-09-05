import { BlockHead, OrderList } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { createOrders } from '../../redux/orders/ordersActions';
import { PageHead } from '../../components/';
import { RootState } from '../../redux/rootReducer';
import { StateUserOrder } from '../../redux/redux.types';
import { useTranslation } from 'react-i18next';
import cls from './OrderAllPage.module.scss';

const OrderAllPage = (): JSX.Element => {
	const {orders} = useSelector((state: RootState) => state);
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

	const getNewOrders = (newOrders: StateUserOrder[]) => {
		return (
			<div className={cls.typeWrapper}>
				<BlockHead>
					New orders
				</BlockHead>
				<OrderList isShowName={true} typeAction="delete" orders={newOrders}/>
			</div>
		);
	};

	const getProgressOrders = (newOrders: StateUserOrder[]) => {
		return (
			<div className={cls.typeWrapper}>
				<BlockHead line="orange">
					Orders in progress
				</BlockHead>
				<OrderList isShowName={true} typeAction="progress" orders={newOrders}/>
			</div>
		);
	};

	const getCompletedOrders = (newOrders: StateUserOrder[]) => {
		return (
			<div className={cls.typeWrapper}>
				<BlockHead line="green">
					Completed orders
				</BlockHead>
				<OrderList isShowName={true} orders={newOrders}/>
			</div>
		);
	};

	const getBodyOrders = () => {
		const listOrders: {
			[key in StateUserOrder['status']]: StateUserOrder[] | []
		} = {
			new: [],
			progress: [],
			completed: []
		};
		orders?.forEach((o) => {
			const linkToArray: StateUserOrder[] = listOrders[o.status];
			return linkToArray.push(o);
		});
		console.log(listOrders);
		return (
			<>
				{!!listOrders.new.length && getNewOrders(listOrders.new)}
				{!!listOrders.progress.length && getProgressOrders(listOrders.progress)}
				{!!listOrders.completed.length && getCompletedOrders(listOrders.completed)}
			</>
		);
	};

	return (
		<div className="row">
			<PageHead>
				{t('orderAll.title')}
			</PageHead>
			{
				orders?.length
					? getBodyOrders()
					: <p>You don't have orders</p>
			}
			<br/>
			<button className="btn btn-primary col-5 ms-auto" onClick={() => addOrderSimple()}>Add order</button>
		</div>
	);
};

export default OrderAllPage;
