

var screen, sound, keyboard, mouse, image, tilesheet, map, offset={x:0,y:0}, player;
window.addEventListener('load', function() {

    // Create instances
    screen    = new NT_Screen('view', 800, 600, '#121212', '#FFFFFF');
    sound     = new NT_SoundHandler();
    keyboard  = new NT_KeyboardHandler();
    mouse     = new NT_MouseHandler('view');
    image     = new NT_ImageHandler();
    tilesheet = new NT_TilesheetHandler();
    map       = new NT_MapHandler();
    player    = new NT_PlayerObject(PLAYERWIDTH, PLAYERHEIGHT, PLAYERSPRITEIMAGE);

    // Debugger
    screen.setDebug(true);
    keyboard.setDebug(true);
    mouse.setDebug(false);
    sound.setDebug(true);
    image.setDebug(true);
    tilesheet.setDebug(true);
    map.setDebug(true);

    map.loadMap('map1', 'asset/map/map3.json');

    screen.disableSmoothing();
	
	// Follow the player
	player.addEventListener("move", function (player) {
		offset.x = player.coords.x - screen.width / 2;
		offset.y = player.coords.y - screen.height / 2;
	});

    // Render Screen
    screen.render();

    image.loadImage('terrain', 'asset/img/terrain.png', function() {
        tilesheet.newSheet('terrain', image.getImage('terrain'), 16, 16, function() {
			requestAnimationFrame(loop);
        });
    });

});

function loop () {
	tickLoop();
	renderLoop();
	requestAnimationFrame(renderLoop);
}

function renderLoop() {
    screen.render();
    screen.renderMap(map.getMap('map1'), 0, tilesheet, 'terrain', 6, offset.x, offset.y);
    screen.renderMap(map.getMap('map1'), 1, tilesheet, 'terrain', 6, offset.x, offset.y);
	//screen.renderPlayer(player, PLAYERSPRITEIMAGE, offset.x, offset.y);

    var c = screen.getContext();
    c.fillStyle = '#FFFFFF';
    c.font = 'normal 18px Courier New';
    c.fillText('Alfalfa Version 1', 10, 22);
}

function tickLoop() {
	var direction = {
		x: 0,
		y: 0
	};
    if (keyboard.keyPressed(65)) {
        direction.x++;
    }
    if (keyboard.keyPressed(68)) {
        direction.x--;
    }
    if (keyboard.keyPressed(87)) {
        direction.y++;
    }
    if (keyboard.keyPressed(83)) {
        direction.y--;
    }
	player.updateDirection(direction);
	player.tickTo(Date.now());
}