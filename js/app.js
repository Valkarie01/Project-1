const canvas =  document.querySelector('#myCanvas')
const ctx = canvas.getContext('2d')
document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)


// variables for ball
let ballX = canvas.width / 2
let ballY = canvas.height / 2
let ballXChange = 3
let ballYChange = 3
let radius = 9

// variables for paddle
let paddleX = 600
let paddleY = 580
const paddleWidth = 150
const paddleHeight = 20
let leftPressed = false
let rightPressed = false 
let paddleSpeed = 5 

// variables for bricks
const bricks = []
const rowCount = 5
const columnCount = 22

// score variables
let score = 0 

// end game 
let gameOver = false

function Brick(x, y, color) {
    this.x = x
    this.y = y 
    this.width = 50
    this.height = 20
    this.color = color
    this.hasBeenHit = false
}
for(let r = 0; r < rowCount; r++) {
    bricks[r] = []

    for(c = 0; c < columnCount; c++) {
        let startX = 50 + (c * 50)
        let startY = 50 + (r * 20)
        let red = Math.floor(Math.random() * 256)
        let green = Math.floor(Math.random() * 256)
        let blue = Math.floor(Math.random() * 256)
        let color = 'rgb('+ red + ',' + green + ',' + blue +')'
        bricks[r][c] = new Brick(startX, startY, color)
    }
}


function drawBricks() {
    for(let r = 0; r < rowCount; r++) {
        for(c = 0; c < columnCount; c++) {
            if(!bricks[r][c].hasBeenHit) {
                ctx.beginPath()
                ctx.rect(bricks[r][c].x, bricks[r][c].y, bricks[r][c].width, bricks[r][c].height)
                ctx.fillStyle = bricks[r][c].color
                ctx.fill()
                ctx.stroke()
                ctx.closePath()
            } 
            if(!bricks[r][c].hasBeenHit) {
                if (ballX + 10 > bricks[r][c].x && ballX - 10 < bricks[r][c].x + bricks[r][c].width && ballY + 10 > bricks[r][c].y && ballY - 10 < bricks[r][c].y + bricks[r][c].height) {
                    bricks[r][c].hasBeenHit = true
                    ballYChange *= -1
                    score++ 
                }
            }
        }
    }
    
}

function drawScore() {
    ctx.font = '35px Ariel'
    ctx.fillStyle = 'blue'
    ctx.fillText('Score ' + score , 1050, 30)
}

// calls the functions for the keys
function keyDownHandler(e) {
    if(e.keyCode === 37 || e.keyCode === 65) {
        leftPressed = true
    } else if(e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = true
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 37 || e.keyCode === 65) {
        leftPressed = false
    } else if(e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = false
    }
}

// moves the paddle
function movement() {
    if(leftPressed && (paddleX - paddleSpeed) >= 0) {
        paddleX -= paddleSpeed
    } else if (rightPressed && (paddleX + paddleSpeed + paddleWidth) <= 1200){
        paddleX += paddleSpeed
    }
}


// puts the paddle on the screen 
function drawPaddle() {
    ctx.fillStyle = "red"
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight)
    ctx.fillStyle = 'radius: 3px'
}

// Draws the ball on the screen
function drawBall() {
    ctx.strokeStyle = '#d13d79'
    ctx.beginPath()
    ctx.arc(ballX, ballY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = "#d13d79"
    ctx.fill()
    ctx.stroke()
}


// When ball collides with something it will change direction

function collison() {
    if(ballX + radius > 1200 || ballX - radius < 0) {
        ballXChange *= -1 
    }

    if(ballY + radius > 600 || ballY - radius < 0) {
        ballYChange *= -1 
        if(ballY + radius > 600) {
            gameOver = true
        }
    }


    if(ballX > paddleX && ballX < paddleX + paddleWidth && ballY + radius > paddleY) {
        ballYChange *= -1
    }
}


// Makes game run
function gameLoop() {
    ctx.clearRect(0, 0, 1200, 600)
        if(!gameOver) {
            drawBall()
            collison()
            drawPaddle()
            movement()
            drawBricks()
            drawScore()
            ballX = ballX + ballXChange
            ballY = ballY + ballYChange
        } else {
            ctx.font = '100px Ariel'
            ctx.fillStyle = 'purple'
            ctx.fillText('Game is over ', 350, 300)
            ctx.fillText('The Score was ' + score , 350, 420)
        }
}

setInterval(gameLoop, 10)
