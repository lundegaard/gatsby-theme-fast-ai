import React from 'react';
import { shallow } from 'enzyme';

import Hamburger from './Hamburger';

describe('<Hamburger />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Hamburger {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
