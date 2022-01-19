import PropTypes from 'prop-types';

export const NavigationRoute = PropTypes.shape({
	to: PropTypes.string.isRequired,
	label: PropTypes.node,
	children: PropTypes.array,
});
