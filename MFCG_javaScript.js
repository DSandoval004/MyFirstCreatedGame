// Player variables
var player,
    pScore,
    pHealth,
    pMana,
    pU = false,
    pR = false,
    pD = false,
    pL = false,
    pS = false,
    pC = false,
    pDash = false;
// Boss variables
var boss,
    bHealth;
// Starts Game
function startGame() {
    player = new component(20, 20, "red", 490, 10);
    boss = new component(40, 40, "blue", 600, 100);
    gameArena.start();
    pStamBar.start();
}
// Sets up Game Arena
var gameArena = {
    canvas: document.getElementById("gameArena"),
    start: function () {
        this.canvas.width = 1250;
        this.canvas.height = 650;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArena, 16);
        // Keyboard control
        document.addEventListener('keydown', push)

        function push(e) {
            // Movement
            if (e.keyCode === 87 /* w */ ) {
                pU = true
            }
            if (e.keyCode === 65 /* d */ ) {
                pL = true
            }
            if (e.keyCode === 83 /* s */ ) {
                pD = true
            }
            if (e.keyCode === 68 /* a */ ) {
                pR = true
            }
            // Mvt +
            if (e.keyCode === 16 /* shift */ ) {
                pS = true
            }
            if (e.keyCode === 18 /* ALT */ ) {
                pC = true
            }
            e.preventDefault();
        }

        document.addEventListener('keyup', release)

        function release(e) {
            if (e.keyCode === 87 /* w */ ) {
                pU = false
                pStamState = 0
            }
            if (e.keyCode === 68 /* d */ ) {
                pR = false
                pStamState = 0
            }
            if (e.keyCode === 83 /* s */ ) {
                pD = false
                pStamState = 0
            }
            if (e.keyCode === 65 /* a */ ) {
                pL = false
                pStamState = 0
            }
            if (e.keyCode === 16 /* shift */ ) {
                pS = false
                pStamState = 0
            }
            if (e.keyCode === 86 /* v */ ) {
                pC = false;
            }
            if (e.keyCode === 18 /* ALT */ ) {
                pC = false
            }
        }
        document.addEventListener('keypress', press)

        function press(e) {
            if (e.keyCode === 32 /* space */ ) {
                pDash = true;
            }
        }
        /*var r1c1 = [],
            r1c2 = [],
            r1c3 = [],
            r1c4 = [],
            r2c1 = [],
            r2c2 = [],
            r2c3 = [],
            r2c4 = [],
            r3c1 = [],
            r3c2 = [],
            r3c3 = [],
            r3c4 = [];
        // console.log(r1c1, r1c2, r1c3, r1c4, r2c1, r2c2, r2c3, r2c4, r3c1, r3c2, r3c3, r3c4);

        function arenaOb() {

        }*/
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
    // Everytime the game is updated these are updated.
    this.update = function () {
        ctx = gameArena.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    // Updates the postion of the player
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.boundaries();
    }
    // Boundaries
    this.boundaries = function () {
        // Sets the variable of the boundaries
        var arenaTop = 30;
        var arenaRight = gameArena.canvas.width - this.width - 125;
        var arenaBottom = gameArena.canvas.height - this.height - 10;
        var arenaLeft = 125;
        // Checks to make sure the aobjects is in the boundaries, and make sure they stay in.
        if (this.y < arenaTop) {
            this.y = arenaTop;
        }
        if (this.x > arenaRight) {
            this.x = arenaRight;
        }
        if (this.y > arenaBottom) {
            this.y = arenaBottom;
        }
        if (this.x < arenaLeft) {
            this.x = arenaLeft;
        }
    }
}
// Stamina Variables
var pStamState = 0,
    pStamTot = 600, // ^
    pStamCur = pStamTot, // Possible expansion for player to change stats
    pStamReg0 = true,
    pStamGLR = 1; //^
// Stamina Calculator/Diplayer
var pStamBar = {
    /* 
        Determine bar percentage: take player current stamina and divide it by total then multiply it by the size of the bar to get pixel size, then apply it to the bar;

        Calculate the player current stamina by first determining what state the player is in, then based off of that take the stamina rate and multiply it by the approite number, and set it to the current stamna
    */
    start: function () {
        // Calculate the bar percentage
        var pStamBarSize = (pStamCur / pStamTot) * 100;
        document.getElementById('pStaminaBar').style.height = pStamBarSize + "%";
        if (pStamCur > pStamTot) {
            pStamCur = pStamTot;
            pStamReg0 = true;
        }
        if (pStamCur < 0) {
            pStamCur = 0;
            pStamReg0 = false;
        }
        if (pStamReg0 === false) {
            document.getElementById('pStaminaBar').style.backgroundColor = 'red';
        } else if (pStamBarSize > 50) {
            document.getElementById('pStaminaBar').style.backgroundColor = 'green';
        } else if (pStamBarSize > 25) {
            document.getElementById('pStaminaBar').style.backgroundColor = 'yellow';
        } else if (pStamBarSize > 12.5) {
            document.getElementById('pStaminaBar').style.backgroundColor = 'orange';
        } else if (pStamBarSize > 5) {
            document.getElementById('pStaminaBar').style.backgroundColor = 'red';
        }
    },
    update: function () {
        pStamBar.start();
    }
};

// Updates game arena
function updateGameArena() {
    gameArena.clear();
    player.speedX = 0;
    player.speedY = 0;
    if (pS && pStamReg0) {
        // Running Controls
        if (pU) {
            player.speedY = -18;
            pStamState = 2;
        }
        if (pR) {
            player.speedX = 18;
            pStamState = 2;
        }
        if (pD) {
            player.speedY = 18;
            pStamState = 2;
        }
        if (pL) {
            player.speedX = -18;
            pStamState = 2;
        }
    } else if (pC) {
        // Crouch
        if (pU) {
            player.speedY = -1;
            pStamState = 1;
        }
        if (pR) {
            player.speedX = 1;
            pStamState = 1;
        }
        if (pD) {
            player.speedY = 1;
            pStamState = 1;
        }
        if (pL) {
            player.speedX = -1;
            pStamState = 1;
        }
    } else {
        // Walking controls
        if (pU) {
            player.speedY = -9;
            pStamState = 1;
        }
        if (pR) {
            player.speedX = 9;
            pStamState = 1;
        }
        if (pD) {
            player.speedY = 9;
            pStamState = 1;
        }
        if (pL) {
            player.speedX = -9;
            pStamState = 1;
        }
    }
    // 0 = still; 1 = walking, 2 = running
    if (pStamState === 0) {
        pStamCur += (pStamGLR * 1.5);
    } else if (pStamState === 1) {
        pStamCur += pStamGLR;
    } else if (pStamState === 2) {
        pStamCur -= (pStamGLR)
    }
    // console.log(pDash);
    pStamBar.update();
    player.newPos();
    player.update();
    boss.update();
};