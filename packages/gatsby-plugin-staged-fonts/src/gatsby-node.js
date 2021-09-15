import fs from 'fs';
import path from 'path';

exports.onPostBootstrap = async ({ reporter, parentSpan }, { fonts }) => {
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
};
