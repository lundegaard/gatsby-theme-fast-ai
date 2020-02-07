import { converge, filter, keys, o, pick } from 'ramda';
import { isFunction, startsWithPrefix } from 'ramda-extension';

/**
 * Returns the display name of a React component, falling back appropriately.
 *
 * @param {React.Component} Component React component to get the name of
 * @returns {string}
 */
const getEventHandlersFromProps = converge(pick, [
	o(filter(startsWithPrefix('on')), keys),
	filter(isFunction),
]);

export default getEventHandlersFromProps;
