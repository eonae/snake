


function GameController(view, engine) {

    var _this = this;

    this.controls = {
        32: function() {         // Пробел
            if (engine.active) {
                engine.stop();
            } else {
                engine.start();
            }
        }
    };

    this.registerSnakeControls = function(snake, controls) {

        if (!controls) {
            if (snake.controls) {
                controls  = snake.controls;
            } else {
                throw new Error('Не задано управление!');
            }
        }

        var directionMap = {
            'left' : { dx: -1, dy: 0 },
            'up' : { dx: 0, dy: -1 },
            'right' : { dx: 1, dy: 0 },
            'down' : { dx: 0, dy: 1 }
        }

        this.controls[controls.left] = function() {
            snake.changeDirection(directionMap['left']);
        }
        this.controls[controls.right] = function() {
            snake.changeDirection(directionMap['right']);
        }
        this.controls[controls.up] = function() {
            snake.changeDirection(directionMap['up']);
        }
        this.controls[controls.down] = function() {
            snake.changeDirection(directionMap['down']);
        }
    }

    view.on('key', function(args) {

        if (args.keyCode in _this.controls) {
            _this.controls[args.keyCode]();
            return true;
        }
        return false;
    });

    for (var snake of engine.snakes) {
        this.registerSnakeControls(snake);
    }
}


