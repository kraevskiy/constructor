import { AxiosError, AxiosResponse } from 'axios';

export interface UseFetchData<T> {
	isLoading: boolean;
	response: AxiosResponse<T>['data'] | null;
	error: AxiosError | null;
}

export type doFetchFn = any;

