import React from 'react';
import PropTypes from 'prop-types';

const SvgIcon = ({ size = 24, ...rest }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentcolor"
		{...rest}
	/>
);

SvgIcon.propTypes = {
	size: PropTypes.number,
};

export default SvgIcon;
