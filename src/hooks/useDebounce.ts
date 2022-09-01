import { useRef } from 'react';

export function useDebounce(callback: Function, delay: number = 500) {
	let timer = useRef(null);

	return (...args: any) => {
		if (timer.current !== null) {
			clearTimeout(timer.current);

			timer.current = setTimeout(() => {
				callback(...args);
			}, delay) as any;
		} else {
			timer.current = setTimeout(() => {
				callback(...args);
			}, delay) as any;
		}
	};
}
