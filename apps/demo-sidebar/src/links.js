export const links = [
	{ label: 'Typography', to: '/typography' },
	{ label: 'Tables', to: '/tables' },
	{ label: 'ToC', to: '/toc' },
	{
		root: true,
		label: 'Other',
		to: '/other/images',
		children: [
			{
				label: 'Still not Images',
				to: '/other/images',
				children: [
					{
						label: 'Images',
						to: '/other/images',
					},
				],
			},
			{
				label: 'Code',
				to: '/other/code',
				children: [
					{
						label: 'Sub page',
						to: '/other/code/subpage',
					},
				],
			},
			{ label: 'Features', to: '/other/features' },
		],
	},
];
