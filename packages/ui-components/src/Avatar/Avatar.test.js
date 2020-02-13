import React from 'react';
import { shallow } from 'enzyme';

import Avatar from './Avatar';

describe('<Avatar />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Avatar {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
