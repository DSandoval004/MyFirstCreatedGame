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
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
// sets up the components
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArena.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
// Updates game arena
function updateGameArena() {
    gameArena.clear();
    player.update();
}