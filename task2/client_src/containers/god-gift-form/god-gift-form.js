module.exports = function GodGiftForm(options) {

	var elem = $('<div class="god-gift-form"></div>');
	var tunnersArray = options.tunnersArray;
	var godIndicatorsArray = options.godIndicatorsArray;

	function render() {
		elem.html(App.templates['god-gift-form']({}));

		tunnersArray.forEach(function(tunner) {
			elem.find('.god-gift-form__tunners').append(tunner.render().elem);
		});
		godIndicatorsArray.forEach(function(indicator) {
			elem.find('.god-gift-form__indicators').append(indicator.render().elem);
		});

		subscribeHandlers(elem);

		return this;
	}

	function subscribeHandlers(elem) {
		elem.find('.god-gift-form__send').click(function() {

			var resultString = '';
			var tunnersInfoArray = [];

			tunnersArray.forEach(function(tunner) {
				tunnersInfoArray.push(tunner.name + ': ' + tunner.getCount());
			});

			resultString += 'send gift [' + tunnersInfoArray.join(', ') + ']';
			console.log(resultString);

		});
	}

	return {
		render: render,
		elem: elem
	}
};
