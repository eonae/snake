var directionMap = {
    'left' : { dx: -1, dy: 0 },
    'up' : { dx: 0, dy: -1 },
    'right' : { dx: 1, dy: 0 },
    'down' : { dx: 0, dy: 1 }
}

function GameController(view, game) {

    var _this = this;

    this.snakeGeneralControls = []
    this.controls = [];

    view.on('key', function(args) {

        for (var i = 0; i < _this.controls.length; i++) {
            for (var key in _this.controls[i]) {
                if (_this.controls[i][key] === args.keyCode) {
                    var newDirection = directionMap[key];
                    if (notOpposite(newDirection, game.snakes[i].direction))
                    game.snakes[i].direction = directionMap[key];
                    return true;
                }
            }
        }
        return false;
    });
}


