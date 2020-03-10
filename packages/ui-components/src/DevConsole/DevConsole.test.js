import React from 'react';
import { shallow } from 'enzyme';

import DevConsole from './DevConsole';

describe('<DevConsole />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<DevConsole {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
