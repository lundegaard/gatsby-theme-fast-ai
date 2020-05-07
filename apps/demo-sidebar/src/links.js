export const links = [
	{ label: 'Typography and text', to: '/typography' },
	{ label: 'Tables', to: '/tables' },
	{
		label: 'Other',
		to: '/other/images',
		children: [
			{
				label: 'Images',
				to: '/other/images',
			},
			{ label: 'Code', to: '/other/code' },
			{ label: 'Features', to: '/other/features' },
		],
	},
];
