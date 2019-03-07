function EventEmitter() {
    this.handlers = {};
    this.on = function(eventName, handler) {
        if (eventName in this.handlers) {
            this.handlers[eventName].push(handler);
        } else {
            this.handlers[eventName] = [ handler ];
        }
    };
    this.off = function(eventName, handler) {
        //..
    };
    this.emit = function(eventName, args) {
        if (eventName in this.handlers) {
            for (var handler of this.handlers[eventName]) {
                handler(args);
            }
        }
    }
}

function create(tagName, classList, text) {
    var $elem = document.createElement(tagName);
    if (classList) {
        for (var cls of classList)
            $elem.classList.add(cls);
    }
    if (text)
        $elem.textContent = text;

    return $elem;
}

function samePosition(position1, position2) {
    return position1.x == position2.x && position1.y == position2.y;
}

function clonePosition(source) {
    return {
        x: source.x,
        y: source.y
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max + min);
}

function notOpposite(direction1, direction2) {
    return !(direction1.dx + direction2.dx === 0 && direction1.dy + direction2.dy === 0);
}

function hide($element) {
    var hidden = $element.classList.contains('hidden');
    if (!hidden)
        $element.classList.add('hidden');
}

function show($element) {
    var hidden = $element.classList.contains('hidden');
    if (hidden)
        $element.classList.remove('hidden');
}

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}