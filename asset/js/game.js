

var screen, sound, keyboard, mouse, image, tilesheet, map, offset={x:0,y:0};
window.addEventListener('load', function() {

    // Create instances
    screen    = new NT_Screen('view', 800, 600, '#888888', '#FFFFFF');
    sound     = new NT_SoundHandler();
    keyboard  = new NT_KeyboardHandler();
    mouse     = new NT_MouseHandler('view');
    image     = new NT_ImageHandler();
    tilesheet = new NT_TilesheetHandler();
    map       = new NT_MapHandler();

    // Debugger
    screen.setDebug(true);
    keyboard.setDebug(true);
    mouse.setDebug(false);
    sound.setDebug(true);
    image.setDebug(true);
    tilesheet.setDebug(true);
    map.setDebug(true);

    map.loadMap('map1', 'asset/map/map2.json');

    screen.disableSmoothing();

    // Render Screen
    screen.render();

    image.loadImage('terrain', 'asset/img/terrain.png', function() {
        tilesheet.newSheet('terrain', image.getImage('terrain'), 16, 16, function() {
            setInterval(function() { tickLoop() }, (1000/30));
            setInterval(function() { renderLoop() }, 0);
        });
    });

});

function renderLoop() {
    screen.render();
    screen.renderMap(map.getMap('map1'), 0, tilesheet, 'terrain', 6, offset.x, offset.y)
    screen.renderMap(map.getMap('map1'), 1, tilesheet, 'terrain', 6, offset.x, offset.y)
}

function tickLoop() {
    if (keyboard.keyPressed(65)) {
        offset.x += 4;
    }
    if (keyboard.keyPressed(68)) {
        offset.x -= 4;
    }
    if (keyboard.keyPressed(87)) {
        offset.y += 4;
    }
    if (keyboard.keyPressed(83)) {
        offset.y -= 4;
    }
}