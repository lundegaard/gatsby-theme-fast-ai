import React from 'react';
import { shallow } from 'enzyme';

import Col from './Col';

describe('<Col />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Col {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
