import React from 'react';
import { shallow } from 'enzyme';

import TextField from './TextField';

describe('<TextField />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<TextField {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
