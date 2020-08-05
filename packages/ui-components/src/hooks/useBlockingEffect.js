import { useEffect, useLayoutEffect } from 'react';

const useBlockingEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default useBlockingEffect;
