import PropTypes from 'prop-types';

export const NavigationRoute = PropTypes.shape({
	to: PropTypes.string.isRequired,
	label: PropTypes.node,
	children: PropTypes.array,
});

export const NavigationRoutes = PropTypes.arrayOf(NavigationRoute);
export const Ref = PropTypes.oneOfType([
	PropTypes.func,
	PropTypes.exact({ current: PropTypes.any }),
]);
