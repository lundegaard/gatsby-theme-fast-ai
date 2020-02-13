import React from 'react';
import { shallow } from 'enzyme';

import Container from './Container';

describe('<Container />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Container {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
