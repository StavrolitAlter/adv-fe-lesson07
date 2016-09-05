module.exports = function TuneControls(options) {

	var elem = $('<div></div>');
	var resourceModel = options.resourceModel;

	function render() {
		elem.html(App.templates['tune-controls']({}));
		subscribeHandlers();

		return this;
	}

	function subscribeHandlers() {
		elem.find('.tune-controls__inc').click(function() {
			resourceModel.inc();
		});
		elem.find('.tune-controls__dec').click(function() {
			resourceModel.dec();
		});
	}

	return {
		render: render,
		elem: elem
	}
};
