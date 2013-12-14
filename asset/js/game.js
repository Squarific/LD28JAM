

var screen, sound, keyboard, mouse, image, tilesheet;
window.addEventListener('load', function() {

    // Create instances
    screen    = new NT_Screen('view', 800, 600, '#888888', '#FFFFFF');
    sound     = new NT_SoundHandler();
    keyboard  = new NT_KeyboardHandler();
    mouse     = new NT_MouseListener('view');
    image     = new NT_ImageHandler();
    tilesheet = new NT_TilesheetHandler();

    // Debugger
    screen.setDebug(true);
    keyboard.setDebug(true);
    mouse.setDebug(false);
    sound.setDebug(true);
    image.setDebug(true);
    tilesheet.setDebug(true);

    screen.disableSmoothing();

    // Render Screen
    screen.render();

    image.loadImage('testSheetImage', 'asset/img/testsheet.png', function() {
        tilesheet.newSheet('testSheet', image.getImage('testSheetImage'), 16, 16, function() {
            tilesheet.renderTile('testSheet', 0, 10, 10, 5, screen.getContext());
            tilesheet.renderTile('testSheet', 1, 106, 10, 5, screen.getContext());
        });
    });

});