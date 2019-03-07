var DEFAULT_CONFIG = {
    defaultName: 'unknown',
    defaultAppearence: {
        head: 'yellow',
        body: 'green'
    },
    transparentBounds: true,
    fieldContainer: '.field',
    playersContainer: '.players',
    interval: 400,
    size: { width: 20, height: 15 },
    accelerationFactor: 0.05,
}

/////////////////////////////////////////

function Game(customConfig) {

    var config = Object.assign(DEFAULT_CONFIG, customConfig);
    if ( !(config.players) || config.players.length === 0)
        throw new Error('Хотя бы один игрок должен быть добавлен!');

    this.players = [];
    
    engine = new Engine(config.size);

    engine.transparentBounds = config.transparentBounds;
    
    for (var playerConfig of config.players) {

         if ( !(playerConfig.appearence) )
             playerConfig.appearence = config.defaultAppearence;

        var snake = engine.addSnake({
            interval: config.interval,
            minInterval: config.minInterval,
            accelerationFactor: config.accelerationFactor,
            appearence: playerConfig.appearence,
            controls: playerConfig.controls
        });

        if ( !(playerConfig.name))
            playerConfig.name = config.defaultName;

        var player = new Player(playerConfig.name, snake, engine);
        var field = new PlayerView(player, config.playersContainer);
        this.players.push(player);
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
