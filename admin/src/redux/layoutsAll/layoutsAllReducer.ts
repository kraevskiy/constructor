import { StateAllLayouts } from '../redux.types';
import { TypesLayoutAll } from '../types';

const initialState: StateAllLayouts[] = [];

export interface ActionType {
	type: TypesLayoutAll
	payload: StateAllLayouts[];
}

export const layoutsAllReducer = (state = initialState, action: ActionType): StateAllLayouts[] | undefined=> {
	switch (action.type) {
		case TypesLayoutAll.getLayoutsAll:
			return action.payload;
		default:
			return state;
	}
};
