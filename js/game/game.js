// Defaults ///////////////////////////////

var DEFAULT_FIELD_CONTAINER = '.field';
var DEFAULT_PLAYERS_CONTAINER = '.players';
var DEFAULT_TRANSPARENT = true;
var DEFAULT_START_INTERVAL = 150;
var DEFAULT_APPEARENCE = { head: 'yellow', body: 'green' };
var DEFAULT_SIZE = { width: 30, height: 16 };
var DEFAULT_ACCELERATION_FACTOR = 0.2; // %
var DEFAULT_NAME = 'unknown';


var DEFAULT = {
    
}

/////////////////////////////////////////

function Game(config) {

    if ( !(config.players) || config.players.length === 0)
        throw new Error('Хотя бы один игрок должен быть добавлен!');

    if ( !(config.transparentBounds) )
        config.transparentBounds = DEFAULT_TRANSPARENT;

    if ( !(config.fieldContainer) )
        config.fieldContainer = DEFAULT_FIELD_CONTAINER;

    if ( !(config.playersContainer) )
        config.playersContainer = DEFAULT_PLAYERS_CONTAINER;

    if ( !(config.startInterval) )
        config.startInterval = DEFAULT_START_INTERVAL;

    if ( !(config.size) )
        config.size = DEFAULT_SIZE;

    if ( !(config.accelerationFactor) )
        config.accelerationFactor = DEFAULT_ACCELERATION_FACTOR;

    this.players = [];
    
    engine = new Engine(config.size);

    engine.transparentBounds = config.transparentBounds;
    
    for (var playerConfig of config.players) {

        if ( !(playerConfig.appearence) )
            playerConfig.appearence = DEFAULT_APPEARENCE;
        if ( !(playerConfig.name))
            playerConfig.name = DEFAULT_NAME;

        var snake = engine.addSnake({
            interval: config.startInterval,
            minInterval: config.minInterval,
            accelerationFactor: config.accelerationFactor,
            appearence: playerConfig.appearence,
            controls: playerConfig.controls
        });

        var player = new Player(playerConfig.name, snake, engine);
        var field = new PlayerView(player, config.playersContainer);
    }

    var field = new GameField(engine); // game!
    field.bind(document.querySelector(config.fieldContainer));

    var controller = new GameController(field, engine);

    field.init();
    engine.init();

    this.engine = engine;
    this.field = field;
    this.controller = controller;        
}
