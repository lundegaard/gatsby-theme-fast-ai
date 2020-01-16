import React from 'react';
import { mount, shallow } from 'enzyme';

import FormField from './FormField';

describe('<FormField />', () => {
	it('shallow', () => {
		const DummyInputText = () => <input type="text" />;
		const DummyIcon = () => <i className="icon" />;

		const props = {
			name: 'testFormField',
			control: DummyInputText,
			suffix: <DummyIcon />,
		};
		const wrapper = shallow(<FormField {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('renders suffix prop', () => {
		const DummyInputText = () => <input type="text" />;
		const DummyIcon = () => <i className="icon" />;

		const props = {
			name: 'testFormField',
			control: DummyInputText,
			suffix: <DummyIcon />,
		};
		const wrapper = mount(<FormField {...props} />);
		expect(wrapper.find('i').hasClass('icon')).toBeTruthy();
	});
});
