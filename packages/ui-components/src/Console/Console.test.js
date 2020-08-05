import React from 'react';
import { shallow } from 'enzyme';

import Console from './Console';

describe('<Console />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Console {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
