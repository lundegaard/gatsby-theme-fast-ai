import React from 'react';
import { shallow } from 'enzyme';

import Image from './Image';

describe('<Image />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Image {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
