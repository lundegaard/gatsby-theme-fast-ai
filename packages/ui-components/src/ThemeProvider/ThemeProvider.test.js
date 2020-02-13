import React from 'react';
import { shallow } from 'enzyme';

import ThemeProvider from './ThemeProvider';

describe('<ThemeProvider />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<ThemeProvider {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
