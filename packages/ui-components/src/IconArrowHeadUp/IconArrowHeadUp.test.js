import React from 'react';
import { shallow } from 'enzyme';

import IconArrowHeadUp from './IconArrowHeadUp';

describe('<IconArrowHeadUp />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconArrowHeadUp {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
