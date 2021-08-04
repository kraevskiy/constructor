import { StateUserLayout } from '../redux.types';
import { TypesLayout } from '../types';

const initialState: StateUserLayout[] = [];

export interface ActionType {
	type: TypesLayout
	payload: StateUserLayout[];
}

export const layoutsReducer = (state = initialState, action: ActionType): StateUserLayout[] | undefined => {
	switch (action.type) {
		case TypesLayout.deleteLayout:
			return state.filter(l => l._id !== action?.payload[0]._id);
		case TypesLayout.createLayout:
			return [...state, action.payload[0]];
		case TypesLayout.getLayouts:
			return action.payload;
		default:
			return state;
	}
};
