import React from 'react';
import { shallow } from 'enzyme';

import SuperFieldHint from './SuperFieldHint';

describe('<SuperFieldHint />', () => {
	const requiredProps = {};

	it('matches snapshot when shallowly rendered', () => {
		const wrapper = shallow(<SuperFieldHint {...requiredProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
