import {useEffect, useRef} from 'react';

export function useEventListener(eventName: string, handler: (e: Event) => void, element = window): void {
	const savedHandler = useRef<(e: Event) => void>();
	useEffect(() => {
		savedHandler.current = handler;
	}, [ handler ]);

	useEffect(() => {
		const isSupported = element && element.addEventListener;
		if (!isSupported) {
			throw new Error('addEventListener is not supported by' + element);
		}

		const eventListener = (event: Event) => {
			if (savedHandler.current) {
				savedHandler.current(event);
			}
		};

		element.addEventListener(eventName, eventListener);

		return () => {
			element.removeEventListener(eventName, eventListener);
		};
	}, [ eventName, element ]);
}
