
// We create our only state, called 'mainState'
var playState = {
    
    // Here we add all the functions we need for our state
	create: function() 
    {
		// This function is called after the preload function
		// Here we set up the game, display sprites, etc.
        
        //* Add the cursor keys to control the player with the keyboard
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        
        // Create the world
        this.createWorld();
        
        // Create the caged hamster
        //this.createCagedHamster();
        
        // Create the player
        this.createPlayer();
        
         // Create the sementes de girassol with the createSeeds function
        this.createSeeds();
        
        // Create the score label calling the createScore function
        this.createScore();
        
        // Create the enemies
        this.createCaveRats();
        
        // Create the sounds
        this.createSound();
        
        
        // Create the timer
        this.createTimer();
        
        
        
        
		
	},

	update: function() 
    {
		// This function is called 60 times per second
		// It contains the game's logic
        
        // Colisions
         // Tell Phaser that the player and the walls should collide
        // Collisions should always be placed at the beginning of the update function
        
        // Testa pelas colisões
        // Deixa de testar as colisões quando o Squeaky morre, para que ele caia para fora do cenário
        if (!this.loseSound.isPlaying) {
            
            game.physics.arcade.collide(this.player, this.platforms);
            game.physics.arcade.collide(this.player, this.ground);
            
             // Impede o sprite de sair da tela do jogo
            this.player.body.collideWorldBounds = true;
        }
        
        else {
            
            this.player.body.collideWorldBounds = false;
        }
            
        // Colisões
        game.physics.arcade.collide(this.player, this.caveRats, this.loseLife, null, this);
        game.physics.arcade.collide(this.caveRats, this.platforms);
        game.physics.arcade.collide(this.caveRats, this.ground);
        game.physics.arcade.collide(this.caveRats, this.cagedHamster);
        
        
        // Add a overlap
        // game.physics.arcade.overlap(objectA, objectB, callback, processCallback, callbackContext)
        game.physics.arcade.overlap(this.player, this.seed, this.takeSeed, null, this);
        // game.physics.arcade.overlap(this.player, this.caveRats, this.loseLife, null, this);
        
        
        // Isso faria com que o grupo dos cave rats ficasse só dentro do mundo, porém eles nunca "morreriam"
        // this.caveRats.setAll('body.collideWorldBounds', true);
        
        
        // Call the function to move the player with the keyboard
        // Must be placed after the statement that makes the player and the walls collide
        this.movePlayer();
        
                
        // Seta a animação certa para os rat caves
        this.caveRats.forEachAlive(this.setAnimation, this);
        
        // Função para calcular a dificuldade do jogo
        this.calculaDificuldade();
    
    
	},
    
    render: function() {
        
        if (this.timer.running) {
            
            var seconds = parseInt(this.timer.ms / 1000); // Tempo em segundos que o timer está contando
            
            var timeLeft = (20 + this.timeEarned) - seconds;
            
            //this.timeLabel.text = 'time: ' + timeLeft;
            //this.timeLabel.text = timeLeft;
            //this.game.debug.text( seconds, 500, 20, {font: '20px Arial', fill: '#ffffff'});
            
            //this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 2, 14, "#ff0");
        
            if (timeLeft < 10)
            {
                this.timeLabel.text = '0' + timeLeft;
            }
            else 
            {
                this.timeLabel.text = timeLeft;
            }

            if (timeLeft > 99)
            {
                this.timeLabel.x = this.timeLabel.x - 5; 
            }

            // Termina o jogo quando o tempo acaba
            if (timeLeft == 0) {
                this.timer.stop();
                this.squeakyDies();

            }
        }

    },
    
    
    // *******************************************************************************************************************
    
    createWorld: function() 
    {
        // Set the background image
        game.add.image(0, 0, 'background');
        
        this.ground = game.add.sprite(0, 382, 'full_ground');
        game.physics.arcade.enable(this.ground);
        
        // Set all the walls to be immovable
        this.ground.body.immovable = true;   
        
        //--------------------------------------------------------
        
        // Add a group for the platforms
        this.platforms = game.add.group();
        
        // Add Arcade physics to the whole group
        this.platforms.enableBody = true;
        
        // Create 6 platforms
        game.add.sprite(000, 260,      'plataforma', 0, this.platforms); 
        game.add.sprite(260, 260,      'plataforma', 0, this.platforms); 
        game.add.sprite(505, 260,      'plataforma', 0, this.platforms); 
        
        this.movingPlatform1 = game.add.sprite(130, 160,      'plataforma', 0, this.platforms); 
        this.movingPlatform2 = game.add.sprite(400, 160,      'plataforma', 0, this.platforms); 
        
        game.add.sprite(505, 078,      'plataforma', 0, this.platforms); 
        game.add.sprite(000, 078,      'plataforma', 0, this.platforms); 
            
        // Set all the platforms to be immovable
        this.platforms.setAll('body.immovable', true);
        
        
        // -----------------------------------------------------------------------------------
        // Cria movimento para duas plataformas
        var tween = game.add.tween(this.movingPlatform1);
        // Change the y position of the platform to 150, in 1000ms

        tween.to({y: 160-50},   1000);
        tween.to({y: 160},      1000);
        tween.to({y: 160+50},   1000);
        tween.to({y: 160},      1000);
        tween.loop();
        tween.start();
        
         // Cria movimento para duas plataformas
        var tween = game.add.tween(this.movingPlatform2);
        // Change the y position of the platform to 150, in 1000ms

        tween.to({y: 160-50},   1000);
        tween.to({y: 160},      1000);
        tween.to({y: 160+50},   1000);
        tween.to({y: 160},      1000);
        tween.loop();
        tween.start();
    },
    
    
    createPlayer: function()
    {
        // Add sprite
        // game.add.sprite(positionX, positionY, imageName);
        // Adiciona um sprite no meio da tela
        this.player = game.add.sprite(300, 350, 'squeaky');
        this.player.frame = 3; // Seta o frame inicial para o squeaky de frente
        
        // animations.add(name, frames, frameRate, loop)
        // Create the 'right' animation by looping the frames 1 and 2
        this.player.animations.add('right', [4, 5, 6], 32, true);
        // Create the 'left' animation by looping the frames 3 and 4
        this.player.animations.add('left', [0, 1, 2], 32, true);
         
        // Center the anchor point to the middle of the sprite
        this.player.anchor.setTo(0.5, 0.5);
        
        // Adding Gravity
        // Tell Phaser that the player will use the Arcade physics engine
        game.physics.arcade.enable(this.player);
        
        // Add vertical gravity to the player
        this.player.body.gravity.y = 500;
        
        
        
        //----------------------------------------------------------------------------------
        
        // animations.add(name, frames, frameRate, loop)
        // Create the 'rotate' animation by looping the frames 3, 4, 7 and 0
        this.player.animations.add('rotate', [3, 4, 7, 0], 32, true);
        
    },
     movePlayer: function() 
    {
        //If the left arrow is pressed
        if (this.cursor.left.isDown)
        {
            // Move the player to the left
            this.player.body.velocity.x = -200;
            this.player.animations.play('left'); // Start the left animation
        }
        
        // If the right arrow is pressed
        else if (this.cursor.right.isDown)
        {
            // Move the player to the right
            this.player.body.velocity.x = 200;
            this.player.animations.play('right'); // Start the right animation
        }
        
        // If neither the right or left arrow key is pressed
        else 
        {
            // Stop the player
            this.player.body.velocity.x = 0;
            this.player.animations.stop('right'); // Stop the animation
            this.player.animations.stop('left'); // Stop the animation
            this.player.frame = 3;
        }
        
        // If the up arrow key is pressed and the player is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) 
        {
            // Move the player upward (jump)
            this.player.body.velocity.y = -360;
            
            // Play the sound when the player jumps
            this.jumpSound.play();
        }
    },
    
    
    // Function to create the seeds
    createSeeds: function() 
    {
        // Display the seed
        this.seed = game.add.sprite(175, 280, 'semente');
        
        // Add Arcade physics to the coin
        game.physics.arcade.enable(this.seed);
        
        // Set the anchor point of the coin to its center
        this.seed.anchor.setTo(0.5, 0.5);
        
    },
    
    takeSeed: function(player, coin) // Parâmetros passados pelo overlap
    {
        
        // Increase the score by 5
        game.global.score += 5;
        
        // Update the score label
        if (game.global.score < 10)
        {
            this.scoreLabel.text = '0' + game.global.score;
        }
        else 
        {
            this.scoreLabel.text = game.global.score;
        }
         
        // Play the sound when the player takes a coin
        this.seedSound.play();
        
        // Create a tween to the coin
        // Scale the coin to 0 to make it invisible
        this.seed.scale.setTo(0, 0);
        // Grow the coin back to its original scale in 300ms
        game.add.tween(this.seed.scale).to({x: 1, y: 1}, 300).start();
        
        // Add a tween so the player will grow slightly when he takes a coin, then get back to his initial size
        game.add.tween(this.player.scale).to({x: 1.3, y: 1.3}, 50).to({x: 1, y: 1}, 150).start();
        
        // Aumenta o tempo do jogo
        this.timeEarned = this.timeEarned + 5;
        
        // Change the coin position
        this.updateSeedPosition();
    },
    
    updateSeedPosition: function() 
    {
        
        // Store all the possible seed positions in an array
        var seedPosition = [
            {x: 040, y: 030}, {x: 175, y: 030}, {x: 300, y: 030}, {x: 440, y: 030}, {x: 545, y: 030},   // Top row
            {x: 040, y: 200},                   {x: 300, y: 200},                   {x: 545, y: 200},   // Middle row
            {x: 040, y: 340}, {x: 175, y: 280}, {x: 300, y: 340}, {x: 440, y: 280}, {x: 545, y: 340}    // Bottom row
        ];
        
        /*// Remove the current seed position from the array
        // Otherwise the seed could appear at the same spot twice in a row
        for (var i = 0; i < coinPosition.length; i++) 
        {
            if (coinPosition[i].x === this.coin.x)
            {
                coinPosition.splice(i, 1);
            }
        }*/
        
        // Randomly select a position from the array
        // Gera um número aleatório do array
        var newPosition = seedPosition[game.rnd.integerInRange(0, seedPosition.length-1)];
        
        // Set the new position of the seed
        this.seed.reset(newPosition.x, newPosition.y);
    },
    
    createScore: function() 
    {
        // Add a score
        // game.add.text(positionX, positionY, text, style)
        this.scoreLabel = game.add.text(270, 40, '00', {font: '18px Arial', fill: '#ffffff'});
        this.scoreLabelText = game.add.text(248, 15, 'SCORE', {font: '18px Arial', fill: '#000000'});
        
        // Cria um label das vidas
        this.livesLabel = game.add.text(350, 15, 'LIVES', {font: '18px Arial', fill: '#000000'});
        
        // Cria a imagem dos 3 corações
        this.heart1 = game.add.image(335, 40, 'heart');
        this.heart2 = game.add.image(365, 40, 'heart');
        this.heart3 = game.add.image(395, 40, 'heart');
        
        // Cria um label para o tempo do jogo
        this.timeLabel = game.add.text(200, 40, 'time: 0', {font: '18px Arial', fill: '#ffffff'});
        
        // Coloca a imagem do timer na tela
        game.add.image(197, 10, 'timer');
        
         // New score variable
         game.global.score = 0;
         game.global.lives = 3;
        
         this.timeEarned = 0; 
    },
    
    createSound: function() 
    {
        this.jumpSound = game.add.audio('jump');
        this.seedSound = game.add.audio('seed');
        this.collideSound = game.add.audio('collide');
        this.loseSound = game.add.audio('lose');
        
        
        this.backgroundMusic = game.add.audio('background');
        this.backgroundMusic.loop = true; // Make it loop
        this.backgroundMusic.play();
    },
    
    createCaveRats: function() 
    {
        // Create a group os cave rats 
        this.caveRats = game.add.group();
        
        // Enable Arcade physics in the whole group
        this.caveRats.enableBody = true;
        
        // Create 10 caveRats with the 'caveRat' image in the group
        // The enemies are "dead" by default, so they are not visible in the game
        this.caveRats.createMultiple(10, 'cave_rat');
        
        // animations.add(name, frames, frameRate, loop)
        // Create the 'right' animation by looping the frames 1 and 2
        //this.caveRats.animations.add('rat-right', [0, 1, 2, 3], 32, true);
        // Create the 'left' animation by looping the frames 3 and 4
        //this.player.animations.add('rat-left', [4, 5, 6, 7], 32, true);
        //group.callAll('animations.add', 'animations', 'swim', frameNames, 30, true, false);
        this.caveRats.callAll('animations.add', 'animations', 'rat-right', [0, 1, 2, 3], 32, true);
        this.caveRats.callAll('animations.add', 'animations', 'rat-left',  [4, 5, 6, 7], 32, true);
        
        // Make enemies appear every few seconds
        //game.time.events.loop(delay, callback, callbackContext)
        // Call 'addEnemy' every 2.2 seconds
        
        // game.time.events.loop(2000, this.addCaveRat, this);  
        
        this.nextCaveRat = 0;
        this.delay = 2000;
        
        
    },
    
    addCaveRat: function() 
    {
        // Get the first dead enemy of the group
        var caveRat = this.caveRats.getFirstDead();
        
        // If there isn't any dead enemy, do nothing
        if (!caveRat) 
        {
            return;
        }
        
        // Initialise the enemy
        
        // Set the anchor point centered at the bottom
        caveRat.anchor.setTo(0.5, 1);
        
        // Put the enemy above the top hole
        // caveRat.reset(game.world.centerX, 0);
        var position = game.rnd.integerInRange(0, 1);
        // 0 = left, 1 = right
        //if (position == 0) {
        //    caveRat.reset(0, 20);    
        //}
        
        //else {
        //    caveRat.reset(590, 20);
        //}
        
        
        // Add gravity to see it fall
        caveRat.body.gravity.y = 500;
        
        // Give some horizontal velocity to make it move right or left
        // caveRat.body.velocity.x = 150 * Phaser.Math.randomSign();
        velocity = 150 * Phaser.Math.randomSign();
        
        // Makes the enemy change direction when hitting a wall
        caveRat.body.bounce.x = 1;
        
        if (velocity <= 0) {
            
            caveRat.animations.play('rat-right'); // Start the left animation
            caveRat.reset(590, 20);
            caveRat.body.velocity.x = velocity;
            
        }
        else {
            
            caveRat.animations.play('rat-left'); // Start the right animation
            caveRat.reset(0, 20);
            caveRat.body.velocity.x = velocity;
        }
                   
           
        // Kills the sprite when it's no longer in the world
        caveRat.checkWorldBounds = true;
        caveRat.outOfBoundsKill = true;
    },
    
    // Seta a animação correta para os rat caves
    setAnimation: function(rat) {
        
        if (rat.body.velocity.x <= 0) {
            
            rat.animations.play('rat-right'); // Start the left animation
            
        }
        else {
            
            rat.animations.play('rat-left'); // Start the right animation
        }
        
    },
    
    createTimer: function() {
        
        // Cria um timer de tempo do jogo
        this.timer = game.time.create();
        
        // Create a delayed event 1m and 30s from now
        // this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.playerDie, this);
        
        // Start the timer
        this.timer.start();
        
        // Coloca o ícone do timer na tela
        
        
    },
    
    // Function to reinitiate the game with the state 'main'
    squeakyDies: function() 
    {
        // If the player is already dead, do nothing
        if (!this.player.alive)
        {
            return;    
        }
        
        // Disabilita o movimento do personagem
        game.input.keyboard.disabled = true;
                
        
        // Stop background music
        this.backgroundMusic.stop();
        
        // Play the sound when the player dies
        this.loseSound.play();
        
        
        // Call the 'startMenu' function in 2000ms - in order to see Squeaky falling
        game.time.events.add(2000, this.startMenu, this);
    
    },
    
    startMenu: function() {
        
        // Kill the player
        this.loseSound.stop();
        this.player.kill();
        game.state.start('menu');  
    },
    
    loseLife: function(player, cave_rat) {
        
        this.collideSound.play();
        
        // Add a tween so the player will grow slightly smaller when he hits a cave rat, then get back to his initial size
        game.add.tween(this.player.scale).to({x: 0.5, y: 0.5}, 50).to({x: 1, y: 1}, 150).start();
        
        game.global.lives = game.global.lives - 1;
        
        // Kill the rat
        cave_rat.kill();
        
        //this.livesLabel.text = 'lives: ' + game.global.lives;
        if (game.global.lives == 2)
        {
            this.heart1.destroy();
        }
        else if (game.global.lives == 1)
        {
            this.heart2.destroy();
        }
        else if (game.global.lives == 0)
        {
            this.heart3.destroy();
        }
        
        if (game.global.lives <= 0) {
            
            this.squeakyDies();
        }
        
        
    },
    
    calculaDificuldade: function() {
        
        // Control the time cave rats appear in the game
        // If the 'nextCaveRat' time has passed
        
        if ( (this.nextCaveRat) < game.time.now)
        {
            // Define our variables
            var start = 2000; // A new cave rat will de added each 2 seconds in the beginning of the game
            var end = 800; // A new cave rat will de added each second to increase difficulty
            var score = 50; // Score that will be used to change the frequency cave rats appear
            
            // Factor based on current score
            var fator_score = game.global.score/score;
            
            // Tests if the cave rats are beind added to the game with a frequency greater than 800ms
            if ( this.delay > end ) {
                this.delay = (start - (fator_score * 100) );
            
            }
            // We add a new enemy
            this.addCaveRat();
            
            // And we update 'nextEnemy' to have a new enemy in 2.2 seconds
            this.nextCaveRat = game.time.now + this.delay;
        }
    },
        
};
