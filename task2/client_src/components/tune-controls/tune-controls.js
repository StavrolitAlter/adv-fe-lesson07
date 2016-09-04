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
			resourceModel.inc('giftCount');
		});
		elem.find('.tune-controls__dec').click(function() {
			resourceModel.dec('giftCount');
		});
	}

	return {
		render: render,
		elem: elem
	}
};
