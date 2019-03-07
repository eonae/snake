// Config ///////////////////////////////

var DEFAULT_TRANSPARENT = true;
var DEFAULT_START_INTERVAL = 150;
var DEFAULT_APPEARENCE = { head: 'yellow', body: 'green' };
var SIZE = { width: 30, height: 16 };
var ACCELERATION_FACTOR = 0.2; // %

/////////////////////////////////////////

var engine = new Engine(SIZE);

engine.addSnake({
    appearence: {
        head: 'yellow',
        body: 'green'
    },
    controls: {
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40
    }
});

engine.addSnake({
    appearence: {
        head: 'brown',
        body: 'blue'
    },
    controls: {
        'left': 65,
        'up': 87,
        'right': 68,
        'down': 83
    }
});

var field = new GameField(engine); // game!
field.bind(document.querySelector('.field'));

var controller = new GameController(field, engine);

field.init();
engine.init();




