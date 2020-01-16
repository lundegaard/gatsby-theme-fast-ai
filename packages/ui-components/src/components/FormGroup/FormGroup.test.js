import React from 'react';
import { shallow } from 'enzyme';

import FormGroup from './FormGroup';

describe('<FormGroup />', () => {
	const requiredProps = { children: 'FormGroup' };

	it('shallow', () => {
		const wrapper = shallow(<FormGroup {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
