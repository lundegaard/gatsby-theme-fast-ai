export const appLinks = [{ label: 'Home', to: '/' }];

export const links = [
	{ label: 'Typography', to: '/typography' },
	{ label: 'Tables', to: '/tables' },
	{ label: 'ToC', to: '/toc' },
	{
		root: true,
		label: 'Root',
		to: '/root',
		children: [
			{
				label: 'Subpage',
				to: '/root/subpage',
				children: [
					{
						label: 'Subpage 4',
						to: '/root/subpage/subpage',
					},
				],
			},
			{
				root: true,
				label: 'Nested root',
				to: '/root/nested-root',
				children: [
					{
						label: 'Subpage 2',
						to: '/root/nested-root/subpage',
						children: [
							{
								label: 'Subpage 3',
								to: '/root/nested-root/subpage/subpage',
							},
						],
					},
				],
			},
		],
	},
	{
		label: 'Other',
		to: '/other',
		children: [
			{
				label: 'Still not Images',
				to: '/other/images',
				children: [
					{
						label: 'Images',
						to: '/other/images',
						children: [
							{
								label: 'Images-2',
								to: '/other/images-2',
							},
							{
								label: 'Images',
								to: '/other/images',
							},
							{
								label: 'Images',
								to: '/other/images',
							},
						],
					},
					{
						label: 'Images',
						to: '/other/images',
					},
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
						label: 'Code Sub page',
						to: '/other/code/subpage',
					},
				],
			},
			{ label: 'Features', to: '/other/features' },
		],
	},
];
