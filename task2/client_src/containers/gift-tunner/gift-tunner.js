var Bar = require('components/bar/bar.js');
var TuneControls = require('components/tune-controls/tune-controls.js');

module.exports = function GiftTunner(options) {

	var elem = $('<div class="gift-tunner"></div>');
	var resourceModel = options.resourceModel;
	var tunnerName = resourceModel.get('name');

	var bar = new Bar({
		model: resourceModel,
		prop: 'giftCount'
	});
	var tunner = new TuneControls({
		resourceModel: resourceModel
	});

	function render() {
		elem.html(App.templates['gift-tunner']({
			name: tunnerName
		}));

		elem.find('.gift-tunner__bar').html(bar.render().elem);
		elem.find('.gift-tunner__controls').html(tunner.render().elem);

		return this;
	}

	return {
		render: render,
		elem: elem,
		name: tunnerName,
		getCount: function() {
			return bar.getCount();
		}
	};
};