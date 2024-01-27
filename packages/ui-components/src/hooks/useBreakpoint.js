import { useMemo } from 'react';
import { createBreakpointHook } from '@restart/hooks/useBreakpoint';
import {
	always,
	anyPass,
	equals,
	ifElse,
	o,
	reject,
	test,
	when,
	zipObj,
} from 'ramda';
import { alwaysNull, isArray, isNilOrEmpty } from 'ramda-extension';

import useTheme from './useTheme';

const getStaticPropsFromArray = ifElse(
	isArray,
	o(
		// Removing both all indices and `length` property
		reject(anyPass([equals('length'), test(/[0-9]+/)])),
		Object.getOwnPropertyNames,
	),
	alwaysNull,
);

const DEFAULT_ALIASES = ['sm', 'md', 'lg', 'xl'];

const getAliases = o(
	when(isNilOrEmpty, always(DEFAULT_ALIASES)),
	getStaticPropsFromArray,
);

/**
 * Bridge between current theme (based on styled-system) and
 * @rebass/hooks/useBreakpoint
 */
const useBreakpoint = (...args) => {
	const { breakpoints } = useTheme();
	const aliases = getAliases(breakpoints);

	// Styled-system use alias `_` for the smallest breakpoint.
	const mapping = zipObj(['_', ...aliases], [0, ...breakpoints]);

	const mappingHash = JSON.stringify([mapping, ...args]);

	// eslint-disable-next-line
	const useBreakpointMemo = useMemo(() => {
		return createBreakpointHook(mapping);
	}, [mappingHash]);
	createBreakpointHook(mapping);

	return useBreakpointMemo(...args);
};

export default useBreakpoint;
