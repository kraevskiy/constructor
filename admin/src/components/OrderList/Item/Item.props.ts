import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { StateUserOrderLayout } from '../../../redux/redux.types';
import { OrderListProps } from '../OrderList.props';

export interface ItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id: string;
	handleDelete: (id: string) => void;
	createdAt: Date;
	layouts: StateUserOrderLayout[];
	typeAction?: OrderListProps['typeAction'];
	userName?: string;
}
