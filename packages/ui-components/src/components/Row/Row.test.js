import React from 'react';
import { shallow } from 'enzyme';

import Row from './Row';

describe('<Row />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<Row {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
