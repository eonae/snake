
function GameController(view, game) {

    var _this = this;

    this.controls = {
        32: function() {         // Пробел
            if (game.active) {
                game.stop();
            } else {
                game.start();
            }
        }
    };

    this.registerSnakeControls = function(snake, controls) {

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
}


