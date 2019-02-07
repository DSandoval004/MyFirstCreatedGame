// Sets up Variables
var player;
// Starts Game
function startGame() {
    player = new component(20, 20, "red", 490, 10);
    gameArena.start();
}
// Sets up Game Arena
var gameArena = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArena, 20);
        // Keyboard control
        window.addEventListener('keydown', function (e) {
            gameArena.keys = (gameArena.keys || []);
            gameArena.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArena.keys[e.keyCode] = (e.type == "keydown");
        })
    }, // Clear arena
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
// sets up the components
function component(width, height, color, x, y) {
    this.gamearena = gameArena
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedy = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArena.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
// Updates game arena
function updateGameArena() {
    gameArena.clear();
    player.speedX = 0;
    player.speedY = 0;
    // Walking controls
    if (gameArena.keys && gameArena.keys[65]) {
        player.speedX = -4;
    }
    if (gameArena.keys && gameArena.keys[68]) {
        player.speedX = 4;
    }
    if (gameArena.keys && gameArena.keys[87]) {
        player.speedY = -4;
    }
    if (gameArena.keys && gameArena.keys[83]) {
        player.speedY = 4;
    }
    // Running Controls
    if (gameArena.keys && gameArena.keys[65] && gameArena.keys[16]) {
        player.speedX = -9;
    }
    if (gameArena.keys && gameArena.keys[68] && gameArena.keys[16]) {
        player.speedX = 9;
    }
    if (gameArena.keys && gameArena.keys[87] && gameArena.keys[16]) {
        player.speedY = -9;
    }
    if (gameArena.keys && gameArena.keys[83] && gameArena.keys[16]) {
        player.speedY = 9;
    }
    // Dash Control
    if (gameArena.keys && gameArena.keys[65] && gameArena.keys[32]) {
        player.x += -5;
    }
    if (gameArena.keys && gameArena.keys[68] && gameArena.keys[32]) {
        player.x += 5;
    }
    if (gameArena.keys && gameArena.keys[87] && gameArena.keys[32]) {
        player.y += -5;
    }
    if (gameArena.keys && gameArena.keys[83] && gameArena.keys[32]) {
        player.y += 5;
    }
    player.newPos();
    player.update();
}