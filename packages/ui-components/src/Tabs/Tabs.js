import React, { forwardRef, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';
import Box from '../Box';

import { TabListContext, TabsContext } from './contexts';

export const TabPane = forwardRef(({ children, ...rest }, ref) => (
	<Box {...rest} ref={ref}>
		{children}
	</Box>
));

TabPane.propTypes = {
	children: PropTypes.node,
};

TabPane.displayName = 'TabPane';

export const TabPanels = forwardRef(({ children, ...rest }, ref) => (
	<Box {...rest} ref={ref}>
		{children({ getAriaProps: () => ({}) })}
	</Box>
));

TabPanels.propTypes = {
	children: PropTypes.node,
};

TabPanels.displayName = 'TabPanels';

const reducer = (state, action) => {
	switch (action.type) {
		case 'change':
			return action.payload;
		default:
			return state;
	}
};

export const TabList = forwardRef(
	({ children, sx, value = '', onChange, ...rest }, ref) => {
		const [state, dispatch] = useReducer(reducer, value);
		const api = useMemo(() => ({ state, dispatch }), [state, dispatch]);

		useEffect(() => {
			onChange?.(state);
		}, [state]);

		useEffect(() => {
			dispatch({ type: 'change', payload: value });
		}, [value]);

		return (
			<TabListContext.Provider value={api}>
				<Box
					ref={ref}
					{...rest}
					sx={{
						width: '100%',
						overflow: 'hidden',
						...sx,
					}}
				>
					<Flex
						role="tablist"
						sx={{
							borderBottom: theme => theme.separatorBorder.normal,
							width: '100%',
							alignItems: 'stretch',
							flexBasis: 'auto',
							overflowX: 'auto',
							overflowY: 'hidden',
							overscrollBehaviorY: 'none',
							scrollPadding: '0',
							scrollSnapType: 'x mandatory',
							'&::-webkit-scrollbar': { display: 'none' },
							msOverflowStyle: 'none',
							scrollbarWidth: 'none',
						}}
					>
						{children}
					</Flex>
				</Box>
			</TabListContext.Provider>
		);
	},
);

TabList.propTypes = {
	children: PropTypes.node,
	onChange: PropTypes.func,
	value: PropTypes.any,
};

TabList.displayName = 'TabList';

export const Tabs = forwardRef(({ children, name, ...rest }, ref) => (
	<TabsContext.Provider value={name}>
		<Box {...rest} ref={ref}>
			{children}
		</Box>
	</TabsContext.Provider>
));

Tabs.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
	name: PropTypes.string,
};

Tabs.displayName = 'Tabs';

export default Tabs;
