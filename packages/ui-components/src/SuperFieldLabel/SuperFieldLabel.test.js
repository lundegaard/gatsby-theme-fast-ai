import React from 'react';
import { shallow } from 'enzyme';

import SuperFieldLabel from './SuperFieldLabel';

describe('<SuperFieldLabel />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<SuperFieldLabel {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
