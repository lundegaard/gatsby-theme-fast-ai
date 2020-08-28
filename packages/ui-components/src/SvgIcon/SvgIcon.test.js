import React from 'react';
import { shallow } from 'enzyme';

import SvgIcon from './SvgIcon';

describe('<SvgIcon />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<SvgIcon {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
