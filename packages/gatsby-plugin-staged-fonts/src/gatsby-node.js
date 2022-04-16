import fs from 'fs';
import path from 'path';

import { generateStyles } from './generateStyles';

exports.onPostBootstrap = async (
	{ reporter, parentSpan, pathPrefix },
	pluginOptions,
) => {
	const { fonts } = pluginOptions;
	const activity = reporter.activityTimer(
		'Copying font files to public folder',
		{
			parentSpan,
		},
	);

	activity.start();

	const filePaths = []
		.concat(
			...fonts.filter(({ critical }) => !critical).map(({ files }) => files),
		)
		.map(({ url }) => url);

	filePaths.forEach(filePath => {
		if (fs.existsSync(filePath)) {
			fs.copyFileSync(filePath, path.join('public', path.basename(filePath)));
		} else {
			reporter.warn(`No file found: ${filePath}`);
		}
	});

	activity.end();

	const styles = generateStyles(pluginOptions, pathPrefix);

	fs.writeFileSync(`${__dirname}/fonts.css`, styles, 'utf-8');
};
