function PlayerView(player, container) {
    
    var _this = this;
    var $template = document.querySelector('.playerCard.template');
    var $card = $template.cloneNode(true);
    $card.classList.remove('template');

    var $name = $card.children[0].children[0];
    var $score = $card.children[1].children[0];
    var $length = $card.children[2].children[0];
    var $speed = $card.children[3].children[0];

    $name.textContent = player.name;

    this.player = player;

    this.bind = function() {
        document.querySelector(container).appendChild($card);
    }

    this.update = function(player) {
        $score.textContent = player.score;

        $speed.textContent = Math.round(player.snake.interval);
        var l = player.snake.length();
        if (player.snake.growOnNextMove)
            l++;
        $length.textContent = l;
    }

    player.on('update', function(args) {
        if (args.player === player)
            _this.update(args.player);
    });

    this.update(player);
    this.bind();
}