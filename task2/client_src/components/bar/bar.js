module.exports = function Bar(options) {

	var elem = $('<div></div>');
	var model = options.model;
	var prop = options.prop;

	model.subscribe(function() {
		render();
	});

	function render() {
		var isPositive = model.get(prop) > 0;
		elem.html(App.templates['bar']({
			progress: Array(Math.abs(model.get(prop))),
			isPositive: isPositive
		}));
		return this;
	}

	return {
		render: render,
		elem: elem,
		getCount: function() {
			return model.get(prop);
		}
	}
};
