import React from 'react';
import { shallow } from 'enzyme';

import Donut from './Donut';

describe('<Donut />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Donut {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
