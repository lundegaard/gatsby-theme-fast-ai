import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
	const requiredProps = {};

	it('shallow', () => {
		const wrapper = shallow(<Checkbox {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
