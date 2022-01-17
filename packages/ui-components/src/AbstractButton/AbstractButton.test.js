import React from 'react';
import { shallow } from 'enzyme';

import AbstractButton from './AbstractButton';

describe('<AbstractButton />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<AbstractButton {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
