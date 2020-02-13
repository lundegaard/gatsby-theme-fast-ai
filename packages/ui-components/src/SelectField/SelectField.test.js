import React from 'react';
import { shallow } from 'enzyme';

import SelectField from './SelectField';

describe('<SelectField />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<SelectField {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
