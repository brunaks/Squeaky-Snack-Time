// Initialise Phaser
var game = new Phaser.Game(590, 400, Phaser.CANVAS, 'gameDiv');

// Define a global score
game.global = {score: 0};

// Define a global number of lives for squeaky
game.global = {lives: 0};

// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

// Start the 'boot' state
game.state.start('boot');
