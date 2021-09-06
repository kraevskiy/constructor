import { StateAllOrders } from '../redux.types';
import { TypesOrderAll } from '../types';

const initialState: StateAllOrders[] = [];
export interface ActionType {
	type: TypesOrderAll
	payload: StateAllOrders[];
}

export const orderAllReducer = (state = initialState, action: ActionType): StateAllOrders[] | undefined => {
	switch (action.type) {
		case TypesOrderAll.getOrdersAll:
			return action.payload;
		default:
			return state;
	}
};
