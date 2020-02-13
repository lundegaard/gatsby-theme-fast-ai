import React from 'react';
import { shallow } from 'enzyme';

import Box from './Box';

describe('<Box />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Box {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
