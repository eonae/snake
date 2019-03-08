$btnSingle = document.getElementById('single');
$btnDouble = document.getElementById('double');

$btnSingle.addEventListener('click', function() {
    var name = prompt('Enter player name:');
    document.querySelector
    var players = [
        {
            name: name,
            appearence: {
                head: 'yellow',
                body: 'green'
            },
            controls: {
                'left': 37,
                'up': 38,
                'right': 39,
                'down': 40
            }
        }
    ];
    startNewGame(players);
    toGameScreen();
});

$btnDouble.addEventListener('click', function() {

    var name1 = prompt('Enter first player name:');
    var name2 = prompt('Enter second player name:');

    var players = [
        {
            name: name1,
            appearence: {
                head: 'yellow',
                body: 'green'
            },
            controls: {
                'left': 37,
                'up': 38,
                'right': 39,
                'down': 40
            }
        },
        {
            name: name2,
            appearence: {
                head: 'brown',
                body: 'blue'
            },
            controls: {
                'left': 65,
                'up': 87,
                'right': 68,
                'down': 83
            }
        }
    ];
    startNewGame(players);
    toGameScreen();
});

function toGameScreen() {

    $startScreen = document.querySelector('.start');
    $gameScreen = document.querySelector('.wrapper');
    
    hide($startScreen);
    show($gameScreen);
    setTimeout(function() {
        $gameScreen.classList.remove('opaque');
    }, 0);
}

function startNewGame(players) {
    window.game = new Game({

        interval: 180,
        minInterval: 120,
        accelerationFactor: 0.03,
        transparentBounds: true,
        size: {
            width: 10,
            height: 10
        },
        players: players
    });

    window.game.engine.on('gameover', showResult);
}

function showResult(args) {

    var $resultsScreen = document.querySelector('.results');
    var $winnerLine = document.querySelector('#winner-line');
    var $winner = document.querySelector('#winner');
    var $yourScoreLine = document.querySelector('#your-score');
    var $score = document.querySelector('#final-score');
    var $btnOneMore = document.querySelector('#one-more');

    var winner;
    if (window.game.players.length === 1) {
        winner = window.game.players[0];
    } else {
        winner = (args.looser.id === 0)
        ? window.game.players[1]
        : window.game.players[0];
    }

    switch(window.game.players.length) {
        case 1:
            show($yourScoreLine);
            $score.textContent = winner.score;
        case 2:
            show($winnerLine);
            $winner.textContent = winner.name;
            $score.textContent = winner.score;
    }

    $btnOneMore.addEventListener('click', function() {
        hide($resultsScreen);
        show(document.querySelector('.start'));
    });
    
    var $gameScreen = document.querySelector('.wrapper');
    var $field = document.querySelector('.field');

    hide($gameScreen);
    removeAllChildren($field);
    removeAllChildren(document.querySelector('.players'));
    show($resultsScreen);
    setTimeout(function() {
        $resultsScreen.classList.remove('opaque');
    }, 0);
}






