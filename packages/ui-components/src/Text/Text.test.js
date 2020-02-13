import React from 'react';
import { shallow } from 'enzyme';

import Text from './Text';

describe('<Text />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Text {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
