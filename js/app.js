
var game = new Game({

    interval: 200,
    minInterval: 100,
    accelerationFactor: 0.05,
    transparentBounds: true,
    size: {
        width: 30,
        height: 16
    },
    players: [
        {
            name: 'Sergey',
            // appearence: {
            //     head: 'yellow',
            //     body: 'green'
            // },
            controls: {
                'left': 37,
                'up': 38,
                'right': 39,
                'down': 40
            }
        },
        {
            name: 'turbo',
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
    ]
});




