import React from 'react';
import { shallow } from 'enzyme';

import IconArrowHeadDown from './IconArrowHeadDown';

describe('<IconArrowHeadDown />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconArrowHeadDown {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
