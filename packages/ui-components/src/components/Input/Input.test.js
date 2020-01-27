import React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';

describe('<Input />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Input {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
