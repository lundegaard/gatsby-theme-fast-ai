import { curry, map, o, unless } from 'ramda';
import { ensureArray, isPlainObject } from 'ramda-extension';

/**
 * Maps responsive CSS values from `styled-system`.
 *
 * @see https://styled-system.com/responsive-styles
 * @example
 *
 * mapResponsiveProperty(x => x + 1, 1) // 2
 * mapResponsiveProperty(x => x + 1, [1, 2]) // [2, 3]
 * mapResponsiveProperty(x => x + 1, { _: 1, xs: 3 }) // [2, 4]
 *
 * @param {Function} mapingFunction
 * @param {any} propertyValue
 *
 * @return {Object|Array}
 */
const mapResponsiveProperty = curry((mapingFunction, propertyValue) =>
	o(map(mapingFunction), unless(isPlainObject, ensureArray))(propertyValue)
);

export default mapResponsiveProperty;
