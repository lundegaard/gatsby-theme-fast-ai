import React from 'react';
import { shallow } from 'enzyme';

import IconInsertLink from './IconInsertLink';

describe('<IconInsertLink />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<IconInsertLink {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
