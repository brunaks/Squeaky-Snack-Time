var menuState = 
{
    create: function() 
    {
        
        // Create the menu again
        game.add.image(0, 0, 'menu');
        game.add.image(400, 50, 'hamtaro-menu');
        
        
        //Display the name of the game
        var nameLabel = game.add.text(game.world.centerX-100, -30, '  Squeaky\'s \nSnack Time', {font: '40px monospace', fill: '#1AA251'});
        nameLabel.anchor.setTo(0.5, 0.5);
        
        
        // Create a tween on the label
        var tween = game.add.tween(nameLabel);
        // Change the y position of the label to 80, in 1000ms
        tween.to({y:150}, 1500);
        // Start the tween
        tween.easing(Phaser.Easing.Bounce.Out);
        tween.start();
        // game.add.tween(nameLabel).to({y:80}, 1000).start();
        
        
        // ----------------------------------------------------------------------------------------------------
        
        // Show the score
        var scoreLabelMenu = game.add.text(100, 200, 'score: 0', {font: '30px monospace', fill: '#1AA251'});
        
        if (this.game.global.score != undefined) {
            scoreLabelMenu.text = 'score: ' + this.game.global.score;
        }
        
        
        // ------------------------------------------------------------------------------------------------------
        
        // Using local storage
        // If 'bestScore' is not defined
        // It means that this is the first time the game is played
        if (!localStorage.getItem('bestScore'))
        {
            // Then set the best score to 0
            localStorage.setItem('bestScore', 0);
        }
        
        // If the score is higher than the best score
        if (game.global.score > localStorage.getItem('bestScore'))
        {
            // Then update the best score
            localStorage.setItem('bestScore', game.global.score);
        }
        
        var text = '\nbest score: ' + localStorage.getItem('bestScore');
        var bestScoreLabel = game.add.text(130, 200, text, {font: '30px Arial', fill: '#ffffff', align: 'center'});
        
        
        // ---------------------------------------------------------------------------------------------------------
        
        //Explain how to start the game
        var startLabel = game.add.text(game.world.centerX, game.world.height-80, 'Press SPACE BAR to play!', {font: '23px monospace', fill: '#F60C0C'});
        startLabel.anchor.setTo(0.5, 0.5);
        
//        // Create a tween for startLabel
        var tween = game.add.tween(startLabel);
        
        tween.to({x: game.world.centerX-20}, 600);
        tween.to({x: game.world.center}, 600);
        tween.to({x: game.world.centerX+20}, 600);
        tween.to({x: game.world.center}, 600);
        tween.loop();
        tween.start();
        
        game.input.keyboard.disabled = false;
        // Create a new Phaser keyboard variable: the up arrow key
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // When the 'upKey' is pressed, it will call the 'start' function once
        upKey.onDown.addOnce(this.start, this);
        
        
        // Cria o áudio de background do menu
        this.menuSound = game.add.audio('menu');
        this.menuSound.loop = true; // Make it loop
        this.menuSound.play();
        
    },

    start: function() 
    {
        // Start the actual game
        game.state.start('play');
        // Stop the background music when the game starts
        this.menuSound.stop();
    },
    
};