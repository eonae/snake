// Config ///////////////////////////////

var DEFAULT_TRANSPARENT = true;
var DEFAULT_START_INTERVAL = 150;
var SIZE = { width: 20, height: 20 };

/////////////////////////////////////////

var game = new Game(SIZE);

var view = new GameField(game); // game!

view.bind(document.querySelector('.field'));

var snake0 = game.spawnLongSnake();

view.init();

var controller = new GameController(view, game);

controller.registerSnakeControls(snake0, {
    'left': 37, 'up': 38, 'right': 39, 'down': 40
});

game.init();




