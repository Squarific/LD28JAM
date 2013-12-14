
/* ---- SCREEN ---- */
function NT_Screen(canvasid, width, height, background, foreground) {
    this.debug = false;
    this.width  = (width!==undefined)? width:800;
    this.height = (height!==undefined)? height:600;
    this.background = (background!==undefined)? background:'#000000';
    this.foreground = (foreground!==undefined)? foreground:'#FFFFFF';
    this.canvasid = (canvasid!==undefined)? canvasid:null;
    this.canvas = (this.canvasid!==null)? document.getElementById(this.canvasid):null;
    this.context = (this.canvas!==null)? this.canvas.getContext('2d'):null;
}
NT_Screen.prototype.render = function() {
    if (this.context !== null) {

        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.width, this.height);

        if (this.debug) {
            console.log('[NTScreen] Rendered Frame');
        }

    }
};
NT_Screen.prototype.getContext = function(callback) {
    if (callback) {
        callback(this.context);
    } else {
        return this.context;
    }
};
NT_Screen.prototype.disableSmoothing = function() {
    if (this.context !== null) {
        this.context.imageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
    }
};
NT_Screen.prototype.enableSmoothing = function() {
    if (this.context !== null) {
        this.context.imageSmoothingEnabled = true;
        this.context.webkitImageSmoothingEnabled = true;
        this.context.mozImageSmoothingEnabled = true;
    }
};
NT_Screen.prototype.setDebug = function(b, callback) {
    this.debug = b;
    if (callback) { callback(); }
};

/* ---- KEYBOARD HANDLER ---- */
function NT_KeyboardHandler() {
    this.keys  = [];
    this.debug = false;

    var t = this;
    window.addEventListener('keydown', function(e) {
       var k = e.keyCode || e.charCode;
       if (!t.keyPressed(k)) {
           t.keys.push(k);
           if (t.debug) {
               console.log('[NTKeyboard] Keys: ' + t.keys);
           }
       }
    });
    window.addEventListener('keyup', function(e) {
        var k = e.keyCode || e.charCode;
        if (t.keyPressed(k)) {
            t.keys.splice(t.keys.indexOf(k), 1);
            if (t.debug) {
                console.log('[NTKeyboard] Keys: ' + t.keys);
            }
        }
    });
    window.addEventListener('blur', function() {
        t.keys = [];
        if (t.debug) {
            console.log('[NTKeyboard] Key array reset due to loss of focus');
        }
    });
}
NT_KeyboardHandler.prototype.keyPressed = function(k) {
    return (this.keys.indexOf(k) !== -1);
};
NT_KeyboardHandler.prototype.setDebug = function(b, callback) {
    this.debug = b;
    if (callback) { callback(); }
};

/* ---- MOUSE LISTENER ---- */
function NT_MouseHandler(relativeID) {
    this.debug = false;
    this.coord = { x: 0, y: 0 };
    this.relID = (relativeID!==undefined)? relativeID:null;
    this.redEl = (this.relID!==null)? document.getElementById(this.relID):null;

    var t = this;
    window.addEventListener('mousemove', function(e) {
        if (t.relID !== null) {
            var box = t.redEl.getBoundingClientRect();
            t.coord.x = e.clientX - box.left;
            t.coord.y = e.clientY - box.top;
        } else {
            t.coord.x = e.clientX;
            t.coord.y = e.clientY;
        }

        if (t.debug) {
            console.log('[NTMouse] Coords: ' + t.coord.x + ', ' + t.coord.y)
        }
    });
}
NT_MouseHandler.prototype.setDebug = function(b, callback) {
    this.debug = b;
    if (callback) { callback(); }
};
NT_MouseHandler.prototype.getCoords = function(callback) {
    if (callback) {
        callback(this.coord);
    } else {
        return this.coord;
    }
}

/* ---- IMAGE HANDLER ---- */
function NT_ImageHandler() {
    this.images = {};
    this.debug  = false;
}
NT_ImageHandler.prototype.loadImage = function(name, file, callback) {
    this.images[name] = {
        image: new Image(),
        size: {
            width:  0,
            height: 0
        }
    };
    this.images[name].image = new Image();
    this.images[name].image.src = file;

    var t = this;
    this.images[name].image.addEventListener('load', function() {
        t.images[name].size.width = t.images[name].image.width;
        t.images[name].size.width = t.images[name].image.width;

        if (t.debug) {
            console.log('[NTImage] Image "' + name + '" was loaded')
        }
        if (callback) { callback(); }
    });
};
NT_ImageHandler.prototype.getImage = function(name, callback) {
    if (callback) {
        callback(this.images[name].image);
        return null;
    } else {
        return this.images[name].image;
    }
};
NT_ImageHandler.prototype.setDebug = function(b, callback) {
    this.debug = b;
    if (callback) { callback(); }
};

/* ---- TILESHEET HANDLER ---- */
function NT_TilesheetHandler() {
    this.tilesheets = {};
    this.debug = false;
}
NT_TilesheetHandler.prototype.setDebug = function(b, callback) {
    this.debug = b;
    if (callback) { callback(); }
};
NT_TilesheetHandler.prototype.newSheet = function(name, image, tilew, tileh, callback) {
    this.tilesheets[name] = {
        image: image,
        tilesize: {
            width:  tilew,
            height: tileh
        }
    };

    if (this.debug) {
        console.log('[NTTilesheet] Tilesheet "' + name + '" was created')
    }
    if (callback) { callback(); }
};
NT_TilesheetHandler.prototype.renderTile = function(name, id, x, y, scale, context, callback) {

    var pos = this.tilePosition(id, this.tilesheets[name].tilesize.width, this.tilesheets[name].tilesize.height, this.tilesheets[name].image.width);
    context.drawImage(this.tilesheets[name].image, pos.x, pos.y, this.tilesheets[name].tilesize.width, this.tilesheets[name].tilesize.height, x, y, this.tilesheets[name].tilesize.width*scale, this.tilesheets[name].tilesize.height*scale);

    if (callback) { callback(); }

};
NT_TilesheetHandler.prototype.tilePosition = function(id, tilew, tileh, imagew, callback) {

    var tw = Math.floor( imagew / tilew );
    var pos = {
        x: (id % tw) * tilew,
        y: Math.floor( id / tw ) * tileh
    };

    if (callback) {
        callback(pos);
    } else {
        return pos;
    }

};

/* ---- SOUND ---- */
function NT_SoundHandler() {
    this.debug  = false;
    this.sounds = {};
}
NT_SoundHandler.prototype.loadSound = function(name, file, callback) {
    this.sounds[name] = new Audio();
    this.sounds[name].src = file;

    var t = this;
    this.sounds[name].addEventListener('canplay', function() {
        if (t.debug) {
            console.log('[NTSound] Sound "' + name + '" was loaded');
        }
        if (callback) { callback(); }
    });
};
NT_SoundHandler.prototype.playSound = function(name, callback) {
    this.sounds[name].play();

    if (this.debug) {
        console.log('[NTSound] Sound "' + name + '" was started');
    }
    if (callback) { callback(); }
};
NT_SoundHandler.prototype.pauseSound = function(name, callback) {
    this.sounds[name].pause();

    if (this.debug) {
        console.log('[NTSound] Sound "' + name + '" was paused');
    }
    if (callback) { callback(); }
};
NT_SoundHandler.prototype.stopSound = function(name, callback) {
    this.sounds[name].stop();

    if (this.debug) {
        console.log('[NTSound] Sound "' + name + '" was stopped');
    }
    if (callback) { callback(); }
};
NT_SoundHandler.prototype.setVolume = function(name, volume, callback) {
    this.sounds[name].volume = volume;

    if (this.debug) {
        console.log('[NTSound] Sound "' + name + '" was set to volume ' + volume);
    }
    if (callback) { callback(); }
};
NT_SoundHandler.prototype.setDebug = function(b, callback) {
    this.debug = b;
    if (callback) { callback(); }
};