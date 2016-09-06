var ResourceIndicator = require('components/resource-indicator/resource-indicator.js');

module.exports = function GiftTunner(options) {

	var elem = $('<div class="wealth-status"></div>');
	var resourceIndicatorsArray = [];
	var resourcesModelsArray = options.resourcesModelsArray;

	resourcesModelsArray.forEach(function(resourceModel) {
		resourceIndicatorsArray.push(new ResourceIndicator({
			resourceModel: resourceModel
		}));
	});

	function render() {

		elem.html(App.templates['user-wealth']({}));

		resourceIndicatorsArray.forEach(function(resourceIndicator) {
			elem.find('.wealth-status__indicators').append(
				resourceIndicator.render().elem
			);
		});

		return this;
	}

	return {
		render: render,
		elem: elem
	};
};