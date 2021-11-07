import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { StateUserOrderLayout } from '../../../redux/redux.types';
import { OrderListProps } from '../OrderList.props';

export interface ItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	orderID?: number | undefined;
	action: OrderListProps['action'];
	titles: string[];
	status: 'new' | 'progress' | 'completed';
	layouts: StateUserOrderLayout[];
	user: string;
	paymentIntent?: 'hold' | 'succeeded';
	_id: string;
	createdAt: Date;
	updatedAt: Date;
	delivery?: string;
	paymentType?: string;
	address?: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
	email?: string;
	comment?: string;
	price?: string;
	count?: string;
}
