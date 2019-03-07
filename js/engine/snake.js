function Segment() {
    this.position = {
        x: 0,
        y: 0
    }
}

var _nextId = 0;

function Snake() {

    var _this = this;

    // Settings ////////////////////////

    this.id = _nextId++;
    this.transparentBounds = null;
    this.bounds = null;
    this.interval = null;
    this.accelerationFactor = null;
    this.minInterval = null;
    this.appearence = null;
    this.speedUpFunction = function(currentInterval, factor) {
        var delta = factor 
        return currentInterval * (1 - delta)
    }

    // State ///////////////////////////

    this.segments = [ new Segment() ];
    this.stop = true;
    this.direction = { dx: 0, dy: 0 }; // По умолчанию не двигается.
    this.justVacated = null;
    this.justOccupied = null;
    this.growOnNextMove = false;
    this.directionChanged = false;

    ///////////////////////////////////
    
    this.speedUp = function() {
        var interval = this.speedUpFunction(this.interval, this.accelerationFactor);
        this.interval = (this.minInterval && interval < this.minInterval)
            ? this.minInterval
            : interval;
    }

    this.controls = null;

    this.getHeadPosition = function() {
        return clonePosition(this.segments[0].position);
    }

    this.length = function() {
        return this.segments.length;
    }

    this.changeDirection = function(dir) {
        if (!(this.directionChanged || this.stop)) {

            if (notOpposite(dir, this.direction)) {
                this.direction = dir;
                this.directionChanged = true;
            }
        }
    }

    this.grow = function() {
        this.growOnNextMove = true;
    }

    this.move = function() {

        if (this.direction.dx === 0 && this.direction.dy === 0) return;

        if (this.growOnNextMove) {

            this.justVacated = null;
            this.segments.push(new Segment());
            this.growOnNextMove = false;
        } else {
            this.justVacated = clonePosition(this.segments[this.segments.length - 1].position);
        }

        for (var i = this.segments.length - 1; i > 0; i--) {
            Object.assign(this.segments[i], this.segments[i - 1]);
        }

        var nextPos = {
            x: this.segments[0].position.x + this.direction.dx,
            y: this.segments[0].position.y + this.direction.dy
        }
    
        var cross = boundCross(nextPos, this.bounds);

        if (cross) {
            if (this.transparentBounds) {
                switch (cross) {
                    case 'up':
                        nextPos.y = this.bounds.height - 1;
                        break;
                    case 'down':
                        nextPos.y = 0;
                        break;
                    case 'left':
                        nextPos.x = this.bounds.width - 1;
                        break;
                    case 'right':
                        nextPos.x = 0;
                        break;
                }
            }
            this.emit('cross', { snake: this, bound: cross });
        }

        this.segments[0].position = nextPos;

        this.justOccupied = clonePosition(nextPos);
        
        this.directionChanged = false;

        this.emit('move', { snake: this } );
    }

    function boundCross(position, bounds) {
        if (position.x < 0) {
            return 'left';
        } else if (position.x > bounds.width - 1) {
            return 'right';
        } else if (position.y < 0) {
            return 'up';
        } else if (position.y > bounds.height - 1) {
            return 'down';
        } else {
            return null;
        }
    }

    this.occupies = function(position) {

        for (var i = this.length() - 1; i >= 0; i--) {
            if (samePosition(this.segments[i].position, position)) {
                return i;
            }
        }

        return -1;
    }

    this.startTimer = function() {
        setTimeout(function() {
            onTimerTick(_this);
        }, _this.interval);
    }
}

function onTimerTick(snake) {

    snake.move();

    if (!(snake.stop)) {
        setTimeout(function() {
            onTimerTick(snake);
        }, snake.interval);
    } else {
        //..
    }
}

Snake.prototype = new EventEmitter();