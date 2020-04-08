import React from 'react';
import { shallow } from 'enzyme';

import RadioGroup from './RadioGroup';

describe('<RadioGroup />', () => {
	const requiredProps = { name: 'test' };

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<RadioGroup {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
