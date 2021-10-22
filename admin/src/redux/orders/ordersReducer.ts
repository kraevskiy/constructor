import { StateUserOrder } from '../redux.types';
import { TypesOrder } from '../types';

const initialState: StateUserOrder[] = [];
export interface ActionType {
	type: TypesOrder
	payload: StateUserOrder[];
}

export const orderReducer = (state = initialState, action: ActionType): StateUserOrder[] | undefined => {
	switch (action.type) {
		case TypesOrder.deleteOrder:
			return state.filter(o=>o._id !== action.payload[0]._id);
		case TypesOrder.createOrder:
			return [...state, action.payload[0]];
		case TypesOrder.getOrders:
			return action.payload;
		case TypesOrder.clearOrder:
			return [];
		default:
			return state;
	}
};
