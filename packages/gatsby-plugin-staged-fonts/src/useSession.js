import { useEffect, useState } from 'react';

const getFromStorage = key => {
	try {
		return JSON.parse(window.sessionStorage[key]);
	} catch (_error) {
		return null;
	}
};

const setToStorage = (key, value) => {
	try {
		window.sessionStorage[key] = JSON.stringify(value);
	} catch (_error) {}
};

const useSession =
	typeof window === 'undefined'
		? (_, initial) => [initial, () => {}]
		: (key, initial) => {
				const [value, setValue] = useState(() =>
					(current =>
						current == null ? (setToStorage(key, initial), initial) : current)(
						getFromStorage(key),
					),
				);

				useEffect(() => {
					setToStorage(key, value);
				});

				return [value, setValue];
		  };
export default useSession;
