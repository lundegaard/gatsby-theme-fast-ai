import React from 'react';
import { shallow } from 'enzyme';

import IconThumbDown from './IconThumbDown';

describe('<IconThumbDown />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconThumbDown {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
