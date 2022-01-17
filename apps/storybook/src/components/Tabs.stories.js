import React from 'react';
import {
	Box,
	Col,
	Container,
	Row,
	Tab,
	TabLabelText,
	TabList,
} from '@fast-ai/ui-components';
import { State } from 'react-powerplug';

export default {
	title: 'Tabs',
	description: 'Usage of Tab navigation.',
	component: TabList,
	subcomponents: { Tab, TabLabelText },
};

const tabItems = [
	{ value: 'home', label: 'Home' },
	{ value: 'guides', label: 'Guides' },
];
export const basic = () => (
	<State initial={{ activeTab: 'home' }}>
		{({ state, setState }) => (
			<Container>
				<Row>
					<Col span={12}>
						<TabList
							value={state.activeTab}
							onChange={newTab => {
								if (newTab != null) {
									setState({ activeTab: newTab });
								}
							}}
						>
							{tabItems.map(({ value, label }) => (
								<Tab
									key={value}
									value={value}
									label={<TabLabelText>{label}</TabLabelText>}
								/>
							))}
						</TabList>
						<Box>{state.activeTab}</Box>
					</Col>
				</Row>
			</Container>
		)}
	</State>
);
