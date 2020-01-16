import React from 'react';
import { shallow } from 'enzyme';

import CheckboxControl from './CheckboxControl';

describe('<CheckboxControl />', () => {
	const requiredProps = { name: 'foo' };

	it('shallow', () => {
		const wrapper = shallow(<CheckboxControl {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
