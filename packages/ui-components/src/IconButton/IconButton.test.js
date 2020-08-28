import React from 'react';
import { shallow } from 'enzyme';

import IconButton from './IconButton';

describe('<IconButton />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconButton {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
