import React from 'react';
import { shallow } from 'enzyme';

import CheckboxField from './CheckboxField';

describe('<CheckboxField />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<CheckboxField {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
