import React from 'react';
import { shallow } from 'enzyme';

import Link from './Link';

describe('<Link />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Link {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
