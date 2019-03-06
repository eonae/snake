function GameField(game) {

    var _this = this;
    this.cells = [];

    this.getCell = function(position) {
        return this.cells[position.x][position.y];
    }

    for (var x = 0; x < game.size.width; x++) {
        var column = [];
        for (var y = 0; y < game.size.height; y++) {
            column.push(
                create('div', ['cell'], x + ' ' + y) //debug
            );
        }
        this.cells.push(column);
    }

    this.bind = function($field) {

        for (var x = 0; x < game.size.width; x++) {
            $column = create('div', ['fieldColumn']);
            for (var y = 0; y < game.size.width; y++) {
                var $cell = this.cells[x][y];
                $column.appendChild($cell);
            }
            $field.appendChild($column);
        }
    }

    this.updateSnake = function(args) {

    var snake = args.snake;
    _this.getCell(snake.justOccupied).classList.toggle('snake0');
    
    if (snake.justVacated) {
        _this.getCell(snake.justVacated).classList.toggle('snake0');
    }

    // Нужно будет дорабатывать.
    }

    this.updateTarget = function(args) {
        _this.getCell(args.target.position).classList.toggle('target');
    }

    this.keydownHandler = function(event) {
        _this.emit('key', { keyCode: event.keyCode });
    }

    this.init = function() {

        for (var snake of game.snakes) {
            for (var segment of snake.segments) {
                _this.cells[segment.position.x][segment.position.y].classList.toggle('snake0');
            }
        }

        game.on('start', function() {

            window.addEventListener('keydown', _this.keydownHandler);
        });
        game.on('stop', function() {
            window.removeEventListener('keydown', _this.keydownHandler);
        });
        game.on('change', _this.updateSnake);
        game.on('target', _this.updateTarget);
    
    }
}

GameField.prototype = new EventEmitter();