import React from 'react';
import { shallow } from 'enzyme';

import Modal from './Modal';

describe('<Modal />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Modal {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
