var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealthBlock = require('containers/user-wealth/user-wealth.js');
var GiftTunnerBlock = require('containers/gift-tunner/gift-tunner.js');
var GodIndicator = require('containers/god-indicator/god-indicator.js');
var ResourceModel = require('models/resource.js');
var IndicatorModel = require('models/indicator.js');

module.exports = function Game() {

	var elem = $('<div></div>');
	var initialResourcesDataArray = [];
	var godGiftForm, userWealthBlock;

	// Getting initial resource data from local JSON server
	var initPromise = fetch('/json-server/wealth/')
		.then(function(response) {
			return response.json();
		})
		.then(function(result) {
			gameBlockCreation(result.resources);
		})
		.catch(function(arror) {
			console.log('An error occured while accessing local DB with resource data');
		});


	function gameBlockCreation(initialResourcesDataArray) {

		var initialGodAttitude = 50;
		var tunnersArray = [];
		var resourcesModelsArray = [];

		initialResourcesDataArray.forEach(function(resourceDataObj) {
			var resourceModel = new ResourceModel(resourceDataObj);
			resourcesModelsArray.push(resourceModel);
			tunnersArray.push(new GiftTunnerBlock({
				resourceModel: resourceModel
			}));
		});

		var indicatorModel = new IndicatorModel(initialGodAttitude);
		var godIndicatorsArray = [
			new GodIndicator({
				name: 'Attitude',
				indicatorModel: indicatorModel
			})
		];

		godGiftForm = new GodGiftForm({
			tunnersArray: tunnersArray,
			godIndicatorsArray: godIndicatorsArray
		});
		userWealthBlock = new UserWealthBlock({
			resourcesModelsArray: resourcesModelsArray
		});

		// Models change observing
		Model.subscribeAll(resourcesModelsArray, function() {
			var commonAttitudeEffect = 0;
			resourcesModelsArray.forEach(function(resourcesModel) {
				commonAttitudeEffect +=
					resourcesModel.get('giftCount') * resourcesModel.get('attitudeEffect');
			});
			indicatorModel.setCount(
				initialGodAttitude - commonAttitudeEffect
			);
		});

		elem.append(userWealthBlock.elem);
		elem.append(godGiftForm.elem);

	}
	

	function render() {
		userWealthBlock.render();
		godGiftForm.render();

		return this;
	}

	return {
		init: initPromise,
		render: render,
		elem: elem
	};
};
