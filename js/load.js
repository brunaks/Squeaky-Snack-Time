var loadState = 
{
    preload: function() 
    {
        
        // Create the loading state
        // Show the background image
        game.add.image(0, 0, 'menu');
        game.add.image(400, 50, 'hamtaro-menu');
        
        // Add a 'loading...' label on the screen
        var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff'});
        
        loadingLabel.anchor.setTo(0.5, 0.5);
        
        // Display the progress bar
        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        
        
        // --------------------------------------------------------------------------------
        // Load all our assets
        //game.load.image('player', 'assets/player.png');
        //game.load.spritesheet('player', 'assets/player2.png', 20, 20);
        
        // Carrega o spritesheet do hamtaro
        game.load.spritesheet('squeaky', 'spritesheet-hamtaro/squeaky-spritesheet-4.png', 32, 34);
        
        // Carrega a imagem de fundo
        game.load.image('background', 'assets/background.png');
        
        // Carrega a imagem da plataforma
        game.load.image('plataforma', 'assets/plataforma_final-2.png');
        
        // Carrega a imagem do tronco que vai formar o chão
        game.load.image('full_ground', 'assets/full_ground.png');
        
        // Carrega a imagem da semenste de girassol
        game.load.image('semente', 'assets/sementeGirassol.png');
        
        // Carrega o spritesheet do inimigo Cobra
        // game.load.spritesheet('cobra', 'spritesheet-cobra/cobra-spritesheet-final.png', 24, 21);
        
        // Carrega o spritesheet do inimigo Cave Rat
        game.load.spritesheet('cave_rat', 'assets/cave_rat_spritesheet-final.png', 40, 34);
        
        // Carrega a imagem do hamster engaiolado
        game.load.image('cagedHamster', 'assets/cagedHamster.png');
        
       
        // Adding sounds
        // Sound when the player jumps
        game.load.audio('jump', ['assets/sons/jump.ogg', 'assets/sons/jump.mp3']);
        game.load.audio('background', ['assets/sons/background1.ogg', 'assets/sons/background.mp3']);
        game.load.audio('seed', ['assets/sons/seed1.ogg', 'assets/sons/seed1.mp3']);
        game.load.audio('collide', ['assets/sons/collideCaveRat2.ogg', 'assets/sons/colideCaveRat2.mp3']);
        game.load.audio('menu', ['assets/sons/menu.ogg', 'assets/sons/menu.mp3']);
        game.load.audio('lose', ['assets/sons/lose.ogg', 'assets/sons/lose.mp3']);
        
        game.load.image('timer', 'assets/alarm_clock2.png');
        game.load.image('heart', 'assets/heart2.png');
    },
    
    create: function() 
    {
        
        // Go to the menu state
        game.state.start('menu');
    },
};