import React from 'react';
import { shallow } from 'enzyme';

import MonospacedText from './MonospacedText';

describe('<MonospacedText />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<MonospacedText {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
