import React from 'react';
import { shallow } from 'enzyme';

import HeadingAnchor from './HeadingAnchor';

describe('<HeadingAnchor />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<HeadingAnchor {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
