import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const SvgIcon = forwardRef(({ size = 24, ...rest }, ref) => (
	<svg
		ref={ref}
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentcolor"
		{...rest}
	/>
));
SvgIcon.displayName = 'SvgIcon';

SvgIcon.propTypes = {
	size: PropTypes.number,
};

export default SvgIcon;
