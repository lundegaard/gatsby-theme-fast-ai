import React from 'react';
import { shallow } from 'enzyme';

import IconSearch from './IconSearch';

describe('<IconSearch />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconSearch {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
