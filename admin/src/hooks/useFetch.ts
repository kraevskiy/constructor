import { useEffect, useState, useCallback, EffectCallback } from 'react';
import Axios from '../helpers/Axios';
import { doFetchFn, UseFetchData } from './useFetch.types';

export default <ExampleResponseData>(url: string): [UseFetchData<ExampleResponseData>, doFetchFn] => {
	const baseUrl = '';
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState({});

	const doFetch = useCallback((options = {}) => {
		setOptions(options);
		setIsLoading(true);
	}, []);

	useEffect(() => {
		let skipGetResponseAfterDestroy = false;
		const requestOptions = {
			...options
		};
		if (!isLoading) return;
		Axios(baseUrl + url, requestOptions)
			.then(res => {
				if (!skipGetResponseAfterDestroy) {
					setIsLoading(false);
					setResponse(res.data);
				}
			}).catch(error => {
			if (error?.response?.status === 401) {
				localStorage.clear();
				window.location.reload();
			}
			if (!skipGetResponseAfterDestroy) {
				setIsLoading(false);
				if (error.response) {
					setError(error.response.data);
				} else if (error.message) {
					setError(error.message);
				} else {
					setError(error);
				}
			}
		});
		return () => {
			skipGetResponseAfterDestroy = true;
		};
	}, [isLoading, options, url]);

	return [{
		isLoading,
		response,
		error
	}, doFetch as EffectCallback];
};

