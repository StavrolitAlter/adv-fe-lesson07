module.exports = Model.createModel({
	init: function(options) {
		$.extend(this.attributes, options);
		this.set('giftCount', 0);
	},
	inc: function(prop) {

		var currentStashCount;

		if (prop === 'stashCount') {
			this.set(prop, this.get(prop) + 1, true);
		} else {
			currentStashCount = this.get('stashCount');
			if (currentStashCount) {
				this.set('stashCount', currentStashCount - 1);
				this.set(prop, this.get(prop) + 1, true);
			} else {
				this.inform('stashCount');
			}
		}

	},
	dec: function(prop) {

		var currentGiftCount;
		if (prop === 'stashCount') {
			this.set(prop, this.get(prop) - 1, true);
		} else {
			currentGiftCount = this.get(prop);
			if (currentGiftCount) {
				this.set('stashCount', this.get('stashCount') + 1);
				this.set(prop, this.get(prop) - 1, true);
			} else {
				this.inform(prop);
			}
		}
		
	},
	inform: function(prop) {
		if (prop === 'stashCount') {
			console.log('This resource stash is empty. You can\'t endow more of this resource');
		} else {
			console.log('You can\'t endow less than nothing');
		}
	}
});