import React from 'react';
import { shallow } from 'enzyme';

import IconArrowDownward from './IconArrowDownward';

describe('<IconArrowDownward />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconArrowDownward {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
