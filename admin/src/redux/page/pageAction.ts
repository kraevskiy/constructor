import { Dispatch } from 'redux';
import { ActionType } from './pageReducer';
import axios from 'axios';
import { TypesPage } from '../types';
import { StatePage } from '../redux.types';
import Axios from '../../helpers/Axios';
import { ICreatePageFormInterface } from '../../components/CreatePageForm/CreatePageForm.interface';
import { errorHandler } from '../../helpers';
import { toast } from 'react-toastify';

export const getPageBySlug = (slug: string) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const res = await axios.get<StatePage>(`${process.env.REACT_APP_PAGE}/slag/${slug}`);
			return dispatch({
				type: TypesPage.getBySlug,
				payload: res.data
			});
		} catch (e) {
			errorHandler(e);
			return null;
		}
	};
};

export const editPageById = (id: string, data: StatePage | ICreatePageFormInterface) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const res = await Axios.patch<StatePage>(`${process.env.REACT_APP_PAGE}/${id}`, data);
			toast.success(`Success edit ${id}`);
			return dispatch({
				type: TypesPage.editById,
				payload: res.data
			});
		} catch (e) {
			errorHandler(e);
			return null;
		}
	};
};


