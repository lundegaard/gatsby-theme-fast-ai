import React from 'react';
import { shallow } from 'enzyme';

import RadioGroupField from './RadioGroupField';

describe('<RadioGroupField />', () => {
	const requiredProps = { name: 'test' };

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<RadioGroupField {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
