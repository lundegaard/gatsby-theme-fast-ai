import React from 'react';
import { shallow } from 'enzyme';

import Flex from './Flex';

describe('<Flex />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Flex {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
