import { toast } from 'react-toastify';
import { ReactText } from 'react';
import axios from 'axios';
import { ToastContent } from 'react-toastify/dist/types';

export const errorHandler = (error: unknown): ReactText => {
	const getText = (e: unknown): ToastContent => {
		if (e instanceof TypeError) {
			console.log('A TypeError', e);
		} else if (e instanceof RangeError) {
			console.log('Handle the RangeError', e);
		} else if (e instanceof EvalError) {
			console.log('you guessed it: EvalError', e);
		} else if (typeof e === "string") {
			return e;
		} else if (axios.isAxiosError(e)) {
			return <>{e.response?.data.error} <br/> {e.response?.data.message}</>;
		} else {
			return 'not find type error: else';
		}
		return 'not find type error';
	};



	return toast(getText(error), {
		type: 'error'
	});
};

