import React from 'react';
import { shallow } from 'enzyme';

import AvatarLink from './AvatarLink';

describe('<AvatarLink />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<AvatarLink {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
