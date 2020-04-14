import React from 'react';
import { shallow } from 'enzyme';

import TransparentSelect from './TransparentSelect';

describe('<TransparentSelect />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<TransparentSelect {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
