import { TypesPage } from '../types';
import { StatePage } from '../redux.types';

const initialState: StatePage = {
	_id: '',
	slag: '',
	seo: {
		seoTitle: { ru: '' },
		seoDescription: { ru: '' }
	},
	header: {
		seoTitle: { ru: '' },
		seoDescription: { ru: '' }
	},
	slides: [],
	souvenirs: {
		title: {
			ru: ''
		},
		items: []
	},
	pictures: {
		title: {
			ru: ''
		},
		items: []
	},
	others: {
		title: {
			ru: ''
		},
		items: []
	},
	advantages: {
		title: {
			ru: ''
		},
		items: []
	},
	contacts: {
		title: {
			ru: ''
		},
		items: []
	},
	faqs: {
		title: {
			ru: ''
		},
		items: []
	},
};

export interface ActionType {
	type: TypesPage
	payload: StatePage;
}

export const pageReducer = (state = initialState, action: ActionType ): StatePage => {
	switch (action.type) {
		case TypesPage.getBySlug:
			return action.payload;
		default:
			return state;
	}
};
