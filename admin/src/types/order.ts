interface LayoutsOrderModel {
	title: string;
	_id: string;
}

export interface OrderType  {
	status: 'new' | 'progress' | 'completed';
	layouts: LayoutsOrderModel[];
	user: string;
	paymentType?: string;
	delivery: string;
	address: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	comment?: string;
	count: string;
	price: string;
	paymentIntent?: 'hold' | 'succeeded';
}
