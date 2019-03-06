function Segment() {
    this.position = {
        x: 0,
        y: 0
    }
}

function Snake() {

    var _this = this;

    this.stop = true;
    this.segments = [ new Segment() ];
    this.direction = { dx: 0, dy: 0 };               // По умолчанию не двигается.
    this.transparentBounds = DEFAULT_TRANSPARENT;
    this.interval = DEFAULT_START_INTERVAL;
    this.bounds = null;
    this.justVacated = null;
    this.justOccupied = null;
    this.growOnNextMove = false;
    this.directionChanged = false;

    this.changeDirection = function(dir) {
        if (!(this.directionChanged || this.stop)) {
            var directionMap = {
                'left' : { dx: -1, dy: 0 },
                'up' : { dx: 0, dy: -1 },
                'right' : { dx: 1, dy: 0 },
                'down' : { dx: 0, dy: 1 }
            }
            if (notOpposite(dir, this.direction)) {
                this.direction = directionMap[dir];
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
            console.log(cross);
            this.emit('cross', { snake: this, bound: cross });
        }

        this.segments[0].position = nextPos;

        this.justOccupied = clonePosition(nextPos);
        
        this.directionChanged = false;

        //this.logPosition();

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
        for (var segment of this.segments) {
            if (samePosition(segment.position, position))
                return true;
        }
        return false;
    }

    this.logPosition = function() {
        console.log('Current position ' + this.segments[0].position.x + ' ' + this.segments[0].position.y);
        console.log('JustVacated ' + this.justVacated.x + ' ' + this.justVacated.y);
        console.log('JustOccupied ' + this.justOccupied.x + ' ' + this.justOccupied.y);
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