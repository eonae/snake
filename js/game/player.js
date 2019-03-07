function Player(name, snake, engine) {

    var _this = this;

    this.name = name;
    this.snake = snake;
    this.score = 0;

    engine.on('score', function(args) {
        if (args.snake === _this.snake) {
            _this.score += args.score;
            _this.emit('update', { player: _this });
        }
    });
}

Player.prototype = new EventEmitter();