import React from 'react';
import { shallow } from 'enzyme';

import Slider from './Slider';

describe('<Slider />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Slider {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
