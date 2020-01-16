import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'ramda-extension';

import withGeneratedId from './withGeneratedId';

describe('withGeneratedId', () => {
	it('passes a generated id prop to the component', () => {
		const Component = noop;
		const WrappedComponent = withGeneratedId(Component);

		const wrapper = mount(<WrappedComponent />);
		expect(wrapper.find(Component).prop('generatedId')).toBe('0');

		const anotherWrapper = mount(<WrappedComponent />);
		expect(anotherWrapper.find(Component).prop('generatedId')).toBe('1');
	});
});
