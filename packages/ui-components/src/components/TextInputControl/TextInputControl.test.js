import React from 'react';
import { shallow } from 'enzyme';

import TextInputControl from './TextInputControl';

describe('<TextInputControl />', () => {
	const requiredProps = { name: 'foo' };

	it('shallow', () => {
		const wrapper = shallow(<TextInputControl {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
