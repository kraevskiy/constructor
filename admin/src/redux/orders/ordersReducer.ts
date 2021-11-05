import { StateUserOrder } from '../redux.types';
import { TypesOrder } from '../types';

const initialState: StateUserOrder[] = [];

export interface ActionType {
	type: TypesOrder
	payload: StateUserOrder[];
}

const getEditOrders = (order: StateUserOrder[], param: keyof StateUserOrder, value: string | number | boolean): StateUserOrder[] => {
	const index = order.findIndex((o: StateUserOrder) => o[param] === value);
	if(index === -1) return order;
	const newOrders = order.map((o, indexNex)=>{
		if(index === indexNex){
			return {...o, [param]: value};
		} else {
			return o;
		}
	});
	return newOrders;
};

export const orderReducer = (state = initialState, action: ActionType): StateUserOrder[] | undefined => {
	switch (action.type) {
		case TypesOrder.deleteOrder:
			return state.filter(o => o._id !== action.payload[0]._id);
		case TypesOrder.createOrder:
			return [...state, action.payload[0]];
		case TypesOrder.editStatusOrder:
			return [...getEditOrders(state, 'status', action.payload[0].status)];
		case TypesOrder.getOrders:
			return action.payload;
		case TypesOrder.clearOrder:
			return [];
		default:
			return state;
	}
};
