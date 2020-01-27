import React from 'react';
import { shallow } from 'enzyme';

import Select from './Select';

describe('<Select />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Select {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
