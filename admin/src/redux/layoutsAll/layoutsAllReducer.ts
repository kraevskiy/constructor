import { StateUserLayout } from '../redux.types';
import { TypesLayoutAll } from '../types';

const initialState: StateUserLayout[] = [];

export interface ActionType {
	type: TypesLayoutAll
	payload: StateUserLayout[];
}

export const layoutsAllReducer = (state = initialState, action: ActionType): StateUserLayout[] | undefined => {
	switch (action.type) {
		case TypesLayoutAll.getLayoutsAll:
			return action.payload;
		default:
			return state;
	}
};
