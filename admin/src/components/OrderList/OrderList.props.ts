import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { StateUserOrder } from '../../redux/redux.types';

export interface OrderListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	orders: StateUserOrder[];
	action: (id: string, type: 'new' | 'progress' | 'completed') => Promise<void>;
}
