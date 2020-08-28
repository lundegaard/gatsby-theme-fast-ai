import React from 'react';
import { shallow } from 'enzyme';

import IconHttp from './IconHttp';

describe('<IconHttp />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconHttp {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
