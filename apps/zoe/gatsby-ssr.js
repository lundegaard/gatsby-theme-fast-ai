import path from 'path';

import React from 'react';

require('dotenv').config({
	path: path.join('.env'),
});

const options = {
	tenantId: process.env.GATSBY_TENANT_ID,
	plugins: ['s-apm', 's-form', 's-biometrics'],
};

export const onRenderBody = ({ setHeadComponents }) => {
	const getScriptUrl = isPlugin => scriptName =>
		`https://sa-sdp.lnd.bz/versions/stable/${scriptName}${isPlugin ? '.plugin' : ''}.js`;

	const script = `
(function(i, s, o, g, r, a, m) {
	i.SAnalyticsObject = r; (i[r] = i[r] || function() {
	(i[r].q = i[r].q || []).push(arguments); }),
	(i[r].l = 1 * new Date()); (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
	a.async = 1;
	a.src = g;
	a.id = 'SAnalyticsScript';
	m.parentNode.insertBefore(a, m);
})(window, document, 'script', '${getScriptUrl()('s-analytics')}', 'sa');

sa('create', '${options.tenantId}');

${options.plugins.map(pluginName => `sa('include', '${pluginName}');`).join('\n')}

(function(d, f, g, e, a, c, b) {
	if ((c = d.getElementById(g))) {
	for (b = 0; b < e.length; b++) {
	(a = d.createElement(f)), (a.async = 1), (a.src = e[b]),
	c.parentNode.insertBefore(a, c.nextSibling);}}
})(document, 'script', 'SAnalyticsScript', [${options.plugins
		.map(pluginName => `'${getScriptUrl(true)(pluginName)}'`)
		.join(', ')}]);`;

	/* eslint-disable react/no-danger */
	setHeadComponents([
		<script
			key="zoe-sa"
			dangerouslySetInnerHTML={{
				__html: script,
			}}
		/>,
	]);
};
