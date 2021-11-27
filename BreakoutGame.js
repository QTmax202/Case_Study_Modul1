let canvas = document.getElementById("myGame");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 20;

let bricks = [];
let brickRowCount = 6;
let brickColumnCount = 4;

for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickRowCount; j++) {
        bricks[i][j] = {x: 0, y: 0, status: 1};
    }
}

let Radius = 9;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, Radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}

let paddleHeight = 10;
let paddleWidth = 95;
let paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#00fda1";
    ctx.fill();
    ctx.closePath();
}

let brickWidth = 70;
let brickHeight = 15;
let brickPadding = 10;
let brickOffsetTop = 10;

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (r * (brickWidth + brickPadding));
                let brickY = (c * (brickHeight + brickOffsetTop)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#00fda1";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function musicPlay() {
    document.getElementById('music').play();
    window.removeEventListener('click', musicPlay);
}


function musicPlay1() {
    document.getElementById('music1').play();
    window.removeEventListener('click', musicPlay);
}

let gameover = document.getElementById("gameover");
let youwin = document.getElementById("youwon");
let youlose = document.getElementById("youlose");
let restart = document.getElementById("restart");

restart.addEventListener("click", function () {
    location.reload();
})

function showYouWin() {
    gameover.style.display = "block";
    youwin.style.display = "block";
}

function showYouLose() {
    gameover.style.display = "block";
    youlose.style.display = "block";
}

drawBall()
drawBricks()
drawPaddle()