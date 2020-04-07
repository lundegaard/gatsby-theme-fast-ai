import React from 'react';
import { shallow } from 'enzyme';

import Gauge from './Gauge';

describe('<Gauge />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Gauge {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
