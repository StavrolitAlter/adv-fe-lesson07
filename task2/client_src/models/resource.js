module.exports = Model.createModel({
	init: function(options) {
		$.extend(this.attributes, options);
		this.set('giftCount', 0, true);
	},
	inc: function() {
		var currentStashCount = this.get('stashCount');
		if (currentStashCount) {
			this.set('stashCount', currentStashCount - 1, true);
			this.set('giftCount', this.get('giftCount') + 1);
		} else {
			this.showError('stashCount');
		}
	},
	dec: function() {
		var currentGiftCount;
		currentGiftCount = this.get('giftCount');
		if (currentGiftCount) {
			this.set('stashCount', this.get('stashCount') + 1, true);
			this.set('giftCount', currentGiftCount - 1);
		} else {
			this.showError('giftCount');
		}
	},
	showError: function(prop) {
		if (prop === 'stashCount') {
			console.warn('This resource stash is empty. You can\'t endow more of this resource');
		} else {
			console.warn('You can\'t endow less than nothing');
		}
	}
});