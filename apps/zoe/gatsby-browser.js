exports.onRouteUpdate = () => {
	window.sa('send', 'pageview');
};
