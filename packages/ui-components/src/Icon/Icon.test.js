import React from 'react';
import { shallow } from 'enzyme';

import Icon from './Icon';

describe('<Icon />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Icon {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
