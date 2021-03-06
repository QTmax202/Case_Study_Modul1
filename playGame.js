let dx = 2.5;
let dy = -2.5;
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    switch (e.which) {
        case 39:
        case 68:
        case 102:
            rightPressed = false;
            break;
        case 37 :
        case 100:
        case 65:
            leftPressed = false;
            break;
    }
}

let score = 0;
let lives = 2;
let high = 0;

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status !== 0) {
                if (x > b.x + Radius && x < b.x + brickWidth + Radius && y > b.y + Radius && y < b.y + brickHeight + Radius) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    musicPlay();
                    if (score === brickColumnCount * brickRowCount) {
                        showYouWin();
                        localStorage.setItem("score" + localStorage.length, score);
                        dx = 0;
                        dy = 0;
                    }
                }
            }
        }
    }
}

function drawScore() {
    document.getElementById("score").innerHTML = score;
}

function drawLives() {
    document.getElementById("live").innerHTML = lives;
}

function drawHigh() {
    for (let i = 0; i < localStorage.length; i++) {
        if (Number(localStorage["score" + i]) > high) {
            high = Number(localStorage["score" + i])
        }
    }
    document.getElementById("high").innerHTML = high;
}

drawScore();
drawLives();
drawHigh();

function playGame() {
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        drawHigh();

        if (x + dx > canvas.width - Radius || x + dx < Radius) {
            dx = -dx;
        }
        if (y + dy < Radius) {
            dy = -dy;
        } else if (y + dy > canvas.height - paddleHeight - Radius && x > paddleX + Radius && x < paddleX + paddleWidth + Radius) {
            dy = -dy;
            musicPlay1();
        } else if (y + dy > canvas.height - Radius) {
            lives -= 1;
            if (lives) {
                x = paddleX + (paddleWidth / 2);
                y = canvas.height - 20;
                dx = 3;
                dy = -3;
            } else {
                showYouLose();
                dx = 0;
                dy = 0;
                localStorage.setItem("score" + localStorage.length, score);
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7.3;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7.3;
        }

        x += dx;
        y += dy;
        window.requestAnimationFrame(draw);
    }

    draw();
}