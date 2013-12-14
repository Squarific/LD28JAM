
# How to use the NerdyTech Engine

## Screen

### Creating a screen

    var screen = new NT_Screen( 'CanvasID', width, height, background, foreground );

## Sound

### Creating a sound

    var sound = new NT_SoundHandler();
    sound.loadSound( 'SoundName', 'file/path', callbackFunction );

### Playing a sound


    sound.playSound( 'SoundName', callbackFunction );

### Pause a sound

    sound.pauseSound( 'SoundName', callbackFunction );

### Stop a sound

    sound.stopSound( 'SoundName', callbackFunction );

### Set a sound volume

    sound.setVolume( 'SoundName', volume, callbackFunction );

## Keyboard

### Create a keyboard handler

    var keyboard = new NT_KeyboardHandler();

### Check if a key is pressed

    keyboard.isPressed( keycode );

## Mouse

### Creating a mouse handler

    var mouse = new NT_MouseHandler();

### Getting position

    mouse.getCoords(callback);

## Image

### Creating a new image

    var image = new NT_ImageHandler();
    image.loadImage( 'ImageName', 'file/path', callbackFunction );

### Get an image

    image.getImage( 'ImageName' );

## Tilesheets

### Create a tilesheet

    var tilesheet = new NT_TilesheetHandler();
    tilesheet.newSheet( 'SheetName', image, tileWidth, tileHeight, callbackFunction );

### Rendering a time

    tilesheet.renderTile( 'SheetName', id, x, y, scale, context, callbackFunction );