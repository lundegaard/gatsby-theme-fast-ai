import { useRef } from 'react';
import { isNil } from 'ramda';

let lastId = 0;

const getLastId = () => String(lastId++);

const useGeneratedId = () => {
	const uniqueID = useRef(null);

	if (isNil(uniqueID.current)) {
		uniqueID.current = getLastId();
	}

	return uniqueID.current;
};

export default useGeneratedId;
