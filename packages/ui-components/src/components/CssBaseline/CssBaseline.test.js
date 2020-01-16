import React from 'react';
import { shallow } from 'enzyme';

import CssBaseline from './CssBaseline';

describe('<CssBaseline />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<CssBaseline {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
