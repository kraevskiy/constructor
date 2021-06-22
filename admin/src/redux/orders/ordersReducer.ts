import { ActionType, StateUserOrder } from '../redux.types';
import { TypesOrder } from '../types';

const initialState: StateUserOrder[] = [];

export const orderReducer = (state = initialState, action: ActionType<TypesOrder, StateUserOrder[]>): StateUserOrder[] | undefined => {
	switch (action.type) {
		// case TypesOrder.deleteOrder:
		// 	return [...state, action.payload];
		case TypesOrder.getOrders:
			return action.payload;
		default:
			return state;
	}
};
