export const links = [
	{ label: 'Typography', to: '/typography' },
	{ label: 'Tables', to: '/tables' },
	{
		label: 'Subcategory',
		to: '/subcategory',
		children: [
			{ label: 'Introduction', to: '/subcategory' },
			{
				label: 'Images',
				to: '/subcategory/images',

				children: [
					{ label: 'Images', to: '/subcategory/images' },
					{ label: 'Code', to: '/subcategory/code' },
					{ label: 'Features', to: '/subcategory/features' },
				],
			},
			{ label: 'Code', to: '/subcategory/code' },
			{ label: 'Features', to: '/subcategory/features' },
		],
	},
];
