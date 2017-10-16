var bootState = 
{
    preload: function() 
    {
        // Load the images that will appear at the loading state
        game.load.image('progressBar', 'assets/progressBar.png');
        game.load.image('menu', 'assets/menu-green.png');
        game.load.image('hamtaro-menu', 'assets/Hamtaro2.png');
    },
    
    create: function() 
    {
        
        // Start the Arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Start the load state
        game.state.start('load');
    }
}