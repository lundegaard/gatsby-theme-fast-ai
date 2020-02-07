import getEventHandlersFromProps from './getEventHandlersFromProps';

describe('getEventHandlersFromProps', () => {
	it('returns every prop which starts with "on"', () => {
		const onClick = () => {};
		const onFocus = () => {};
		const name = 'test';

		expect(getEventHandlersFromProps({ onClick, onFocus, name })).toEqual({
			onClick,
			onFocus,
		});
	});

	it('every returned prop must be a function', () => {
		const onClick = () => {};
		const onFocus = 'foo';
		const name = 'test';

		expect(getEventHandlersFromProps({ onClick, onFocus, name })).toEqual({
			onClick,
		});
	});
});
