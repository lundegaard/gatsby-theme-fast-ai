import React from 'react';
import { shallow } from 'enzyme';

import Tabs from './Tabs';

describe('<Tabs />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Tabs {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
