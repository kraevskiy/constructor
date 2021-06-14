import { useState } from 'react';

type InitialValueType = ((data?: unknown) => void) | { [key: string]: unknown } | number | unknown;

export default function useLocalStorage(key: string, initialValue: InitialValueType): [string, (data: InitialValueType) => void] {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);

			if (item) {
				return JSON.parse(item);
			}

			let evaluated;
			if(typeof initialValue === 'function'){
				evaluated = initialValue();
			} else {
				evaluated = initialValue;
			}

			window.localStorage.setItem(key, JSON.stringify(evaluated));
			return evaluated;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = (newValue: InitialValueType) => {
		try {
			let evaluated;
			if(typeof newValue === 'function'){
				evaluated = newValue(storedValue);
			} else {
				evaluated = newValue;
			}

			window.localStorage.setItem(key, JSON.stringify(evaluated));
			setStoredValue(evaluated);
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setValue];
}
