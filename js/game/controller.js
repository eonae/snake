
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

        this.controls[controls.left] = function() {
            snake.changeDirection('left');
        }
        this.controls[controls.right] = function() {
            snake.changeDirection('right');
        }
        this.controls[controls.up] = function() {
            snake.changeDirection('up');
        }
        this.controls[controls.down] = function() {
            snake.changeDirection('down');
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


