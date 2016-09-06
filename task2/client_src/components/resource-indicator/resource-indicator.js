module.exports = function ResourceIndicator(options) {

	var elem = $('<li></li>');
	var resourceModel = options.resourceModel;

	resourceModel.subscribe(function() {
		render();
	});

	function render() {
		elem.html(
			resourceModel.get('name') + ': ' +
			resourceModel.get('stashCount')
		);
		return this;
	}

	return {
		render: render,
		elem: elem
	}
};
