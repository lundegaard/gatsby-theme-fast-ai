import React from 'react';
import { shallow } from 'enzyme';

import IconScience from './IconScience';

describe('<IconScience />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconScience {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
