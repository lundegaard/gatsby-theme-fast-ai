import React from 'react';
import { shallow } from 'enzyme';

import IconArrowForward from './IconArrowForward';

describe('<IconArrowForward />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconArrowForward {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
