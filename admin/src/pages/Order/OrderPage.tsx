import React from 'react';
import { OrderList } from '../../components';

const OrdersPage = (): JSX.Element => {

	return (
		<div className="row">
			<h1 className="text-center col-12 mb-5">OrdersPage (logged)</h1>
			<OrderList/>
		</div>
	);
};

export default OrdersPage;
