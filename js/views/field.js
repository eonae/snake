function GameField(game) {

    this.test = false; //debug

    var _this = this;
    this.cells = [];

    this.classes = {};

    this.setClasses = function() {
        for (var snake of game.snakes) {

        }
    }

    this.getCell = function(position) {
        return this.cells[position.x][position.y];
    }

    for (var x = 0; x < game.size.width; x++) {
        var column = [];
        for (var y = 0; y < game.size.height; y++) {
            column.push(
                create('div', ['cell']) //, x + ' ' + y) //debug
            );
        }
        this.cells.push(column);
    }

    this.bind = function($field) {

        for (var x = 0; x < game.size.width; x++) {
            $column = create('div', ['fieldColumn']);
            for (var y = 0; y < game.size.height; y++) {
                var $cell = this.cells[x][y];
                $column.appendChild($cell);
            }
            $field.appendChild($column);
        }
        //this.pauseScreen = create('div', ['pause', 'hidden'], 'Pause');
        //this.init();
    }

    this.updateSnake = function(args) {

    // 1) убрать head там, где она была (segments[2].position.
    // 2) добавить head там, куда пришли.
    // 3) добавить snake там, где был head, если длина > 1.
    // 4) убрать snake в конце

    //debugger;
    var snake = args.snake;
    var clsHead = _this.classes[snake.id].head;
    var clsBody = _this.classes[snake.id].body;

    _this.getCell(snake.justOccupied).classList.add(clsHead);

    if (snake.justVacated) { // Будет null если змейка выросла.
        _this.getCell(snake.justVacated).classList.remove(clsHead);
        _this.getCell(snake.justVacated).classList.remove(clsBody);
    }


    if (snake.segments.length > 1) {
        var $secondSegment = _this.getCell(snake.segments[1].position);
        $secondSegment.classList.remove(clsHead);
        $secondSegment.classList.add(clsBody);
    }
    

    // var snake = args.snake;
    // _this.getCell(snake.justOccupied).classList.toggle('snake0');

    // if (snake.justVacated) {
    //     _this.getCell(snake.justVacated).classList.toggle('snake0');
    // }

    // Нужно будет дорабатывать.
    }

    this.updateTarget = function(args) {
        _this.getCell(args.target.position).classList.toggle('target');
    }

    this.init = function() {

        for (var snake of game.snakes) {

            var clsHead = snake.appearence.head + 'Head';
            var clsBody = snake.appearence.body + 'Body';

            // Создаём мапу классов.
            _this.classes[snake.id] = { head: clsHead, body: clsBody };

            for (var i = 0; i < snake.segments.length; i++)
            {
                var cls = (i === 0)? clsHead : clsBody
                _this.getCell(snake.segments[i].position).classList.add(cls);
            }
        }

        window.addEventListener('keydown', function(event) {
            _this.emit('key', { keyCode: event.keyCode });
        });

        game.on('change', _this.updateSnake);
        game.on('target', _this.updateTarget);
    }
}

GameField.prototype = new EventEmitter();