(function(global) {

	function Model() {
		this.attributes = {};
		this.subscribers = [];
		this.init.apply(this, arguments);
	}

	Model.prototype = {
		init: function() {
			console.log('prototype init');
		},
		subscribe: function(cb) {
			this.subscribers.push(cb);
		},
		notify: function() {
			this.subscribers.forEach(function(cb) {
				cb();
			});
		},
		set: function(key, value, silent) {
			this.attributes[key] = value;
			if (!silent) {
				this.notify();
			}
		},
		get: function(key) {
			return this.attributes[key];
		}
	};

	Model.subscribeAll = function(models, cb) {
		models.forEach(function(model) {
			model.subscribe(cb);
		});
	};

	Model.createModel = function(custom) {
		var child = function() {
			return Model.apply(this, arguments);
		};
		child.prototype = $.extend({}, Model.prototype, custom);
		return child;
	};

	global.Model = Model;

})(window);