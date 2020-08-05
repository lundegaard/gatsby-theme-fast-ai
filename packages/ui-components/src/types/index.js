import PropTypes from 'prop-types';

const getResponsivePropType = (x) =>
	PropTypes.oneOfType([x, PropTypes.object, PropTypes.arrayOf(x)]);

export const responsiveNumber = getResponsivePropType(PropTypes.number);
