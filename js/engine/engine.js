function Target(position) {
    this.position = position;
}

function Engine(size) {

    var _this = this;

    this.active = false;
    this.snakes = [];
    this.targets = [];
    this.size = size;
    this.transparentBounds = DEFAULT_TRANSPARENT;

    this.addSnake = function(config) {

        var snake = this.spawnSnake();
        snake.controls = config.controls;
        snake.appearence = config.appearence;
    };

    this.init = function() {
        for (var i = 0; i < this.snakes.length; i++) {
            this.spawnTarget();
        }
        this.start();
    }

    this.start = function() {
        for (var snake of this.snakes) {
            snake.stop = false;
            snake.startTimer();
        }
        this.active = true;
        this.emit('start', { engine: this} );
    }

    this.stop = function() {
        for (var snake of this.snakes) {
            snake.stop = true;
        }
        this.active = false;
        this.emit('stop', { engine: this} );
    }

    this.spawnTarget = function() {
        var target = new Target(this.getRandomPosition());
        console.log('spawned at ' + target.position.x + ' ' + target.position.y);
        this.targets.push(target);
        this.emit('target', { target: target }); // Потом нужно сделать отдельно spawn и consume
    }

    this.checkCollision = function(snake) {

        for (var sn of this.snakes) {
            if (sn === snake) {
                console.log(sn.occupies(snake.getHeadPosition()));
                if (sn.occupies(snake.getHeadPosition()) !== 0) {
                    return sn;
                }
            } else if (sn.occupies(snake.getHeadPosition()) !== -1) {
                return sn;
            }
        }

        for (var target of this.targets) {
            if (samePosition(target.position, snake.getHeadPosition())) {
                return target;
            }
        }
        return null;
    }


    // Debug 
    this.spawnLongSnake = function() {
        var snake = new Snake();
        console.log(snake instanceof Snake);

        snake.segments[0].position = { x: 10, y: 10 };
        for (var i = 0; i < 5; i++) {
            var segment = new Segment();
            segment.position = { x: 10, y: 11 + i }
            snake.segments.push(segment);
        }
        snake.justOccupied = clonePosition(snake.segments[0].position);
        snake.transparentBounds = this.transparentBounds;
        snake.bounds = size;
        this.snakes.push(snake);

        snake.on('move', function(args) {

            var snake = args.snake;
            var collision = _this.checkCollision(args.snake);

            if (collision) {
                if (collision instanceof Target) {
                    _this.targets.splice(_this.targets.indexOf(collision), 1);
                    _this.emit('target', { target: collision });
                    _this.spawnTarget();
                    snake.speedUp();
                    snake.grow();
                } else if (collision instanceof Snake) {
                    _this.stop();   // Здесь надо разобраться с порядком действий - сначала стоп или сначала emit!
                    alert('ooops');
                } else {
                    alert('Unidentified collistion!');
                }
            }
            
            _this.emit('change', { snake: snake });
        });

        return snake;
    }

    this.spawnSnake = function() {
        var snake = new Snake();
        console.log(snake instanceof Snake);

        snake.segments[0].position = this.getRandomPosition();
        snake.justOccupied = clonePosition(snake.segments[0].position);
        snake.transparentBounds = this.transparentBounds;
        snake.bounds = size;
        this.snakes.push(snake);

        snake.on('move', function(args) {

            var collision = _this.checkCollision(args.snake);

            if (collision) {
                if (collision instanceof Target) {
                    _this.targets.splice(_this.targets.indexOf(collision), 1);
                    _this.emit('target', { target: collision });
                    _this.spawnTarget();
                    //args.snake.interval -= 50; Ускорение!
                    args.snake.grow();
                } else if (collision instanceof Snake) {
                    _this.stop();
                    alert('ooops');
                } else {
                    alert('Unidentified collistion!');
                }
            }

            
            _this.emit('change', { snake: args.snake });
        });

        return snake;
    }

    this.getRandomPosition = function() {

        while(true) {
            var position = {
                x: getRandomInt(0, this.size.width),
                y: getRandomInt(0, this.size.height)
            }
            if (this.isFree(position)) {
                return position;
            }
        }
    }

    this.isFree = function(position) {
        for (var snake of this.snakes) {
            if (snake.occupies(position) !== -1) return false;
        }
        for (var target of this.targets) {
            if (samePosition(target.position, position)) return false;
        }
        return true;
    }
}

Engine.prototype = new EventEmitter();
