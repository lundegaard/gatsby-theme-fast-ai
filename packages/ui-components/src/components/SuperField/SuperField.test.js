import React from 'react';
import { shallow } from 'enzyme';

import SuperField from './SuperField';

describe('<SuperField />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<SuperField {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
