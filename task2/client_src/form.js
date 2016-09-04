var Game = require('containers/game/game.js');
var gameInstance = new Game();
gameInstance.init.then(function() {
	$('.content').html(gameInstance.render().elem)
});