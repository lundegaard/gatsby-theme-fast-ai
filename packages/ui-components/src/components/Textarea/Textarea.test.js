import React from 'react';
import { shallow } from 'enzyme';

import Textarea from './Textarea';

describe('<Textarea />', () => {
	const requiredProps = {};

	it('shallow', () => {
		const wrapper = shallow(<Textarea {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
