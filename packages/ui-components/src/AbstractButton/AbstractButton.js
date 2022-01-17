import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const isNativeButton = el =>
	el.nodeName === 'BUTTON' || (el.nodeName === 'A' && el.getAttribute('href'));

/**
 * Keyword navigation for non native elements:
 * - Enter will trigger click event
 *
 * Adds aria attributes:
 * - `aria-disabled`
 */
export const useAbstractButton = ({
	disabled,
	onClick,
	onKeyDown,
	tabIndex = 0,
	...rest
}) => {
	const handleKeyDown = useCallback(
		event => {
			onKeyDown?.(event);

			if (
				event.target === event.currentTarget &&
				!disabled &&
				!isNativeButton(event.target) &&
				event.key === 'Enter'
			) {
				event.preventDefault();

				onClick?.(event);
			}
		},
		[onClick, disabled, onKeyDown],
	);

	return {
		onKeyDown: handleKeyDown,
		onClick,
		disabled,
		tabIndex: disabled ? -1 : tabIndex,
		'aria-disabled': disabled ? disabled : void 0,
		...rest,
	};
};

const AbstractButton = forwardRef(
	({ component: ButtonComponent = 'button', ...rest }, ref) => {
		const props = useAbstractButton({ ref, ...rest });

		return <ButtonComponent {...props} />;
	},
);

AbstractButton.propTypes = {
	component: PropTypes.elementType,
};

AbstractButton.displayName = 'AbstractButton';

export default AbstractButton;
