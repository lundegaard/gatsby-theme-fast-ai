import React from 'react';
import { shallow } from 'enzyme';

import SliderField from './SliderField';

describe('<SliderField />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<SliderField {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
