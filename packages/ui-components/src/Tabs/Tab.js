import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';
import { useAbstractButton } from '../AbstractButton';

import { TabListContext } from './contexts';

const styles = {
	root: {
		alignItems: 'stretch',
		variant: 'Tab',
		flexShrink: 0,
		flexGrow: 1,
		flexBasis: 'auto',
		flexDirection: 'column',
		minWidth: '0px',
		minHeight: '0px',
		position: 'relative',
		zIndex: 0,
		borderBottom: theme => theme.separatorBorder.bold,
	},
	label: {
		variant: 'TabLabel',
		cursor: 'pointer',
		flexDirection: 'column',
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 'auto',
		justifyContent: 'center',
		outlineStyle: 'none',
		alignItems: 'center',
		minWidth: '0px',
		minHeight: '0px',
		position: 'relative',
		zIndex: 0,
	},
};

const Tab = forwardRef(({ sx, label, value, ...rest }, ref) => {
	const { dispatch, state: currentValue } = useContext(TabListContext);

	const buttonProps = useAbstractButton({
		onClick: () => dispatch({ type: 'change', payload: value }),
	});

	return (
		<Flex
			sx={{
				...sx,
				...styles.root,
				borderBottomColor: theme =>
					currentValue === value ? theme.colors.secondary : 'transparent',
			}}
			{...rest}
			{...buttonProps}
			ref={ref}
		>
			<Flex sx={styles.label}>{label}</Flex>
		</Flex>
	);
});

Tab.propTypes = {
	label: PropTypes.node,
	value: PropTypes.any,
};

Tab.displayName = 'Tab';

export default Tab;
