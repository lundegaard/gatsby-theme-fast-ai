import React from 'react';
import { shallow } from 'enzyme';

import TabLabelText from './TabLabelText';

describe('<TabLabelText />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<TabLabelText {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
