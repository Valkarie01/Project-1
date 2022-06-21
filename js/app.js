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
        let startY = 30 + (r * 20)
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
            ctx.beginPath()
            ctx.rect(bricks[r][c].x, bricks[r][c].y, bricks[r][c].width, bricks[r][c].height)
            ctx.fillStyle = bricks[r][c].color
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }
    }
    
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
}

// Draws the ball on the screen
function drawBall() {
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.arc(ballX, ballY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = "black"
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
    }
    if(ballX > paddleX && ballX < paddleX + paddleWidth && ballY + radius > paddleY) {
        ballYChange *= -1
    }
}

// Makes game run
function gameLoop() {
    ctx.clearRect(0, 0, 1200, 600)
    drawPaddle()
    drawBall()
    collison()
    movement()
    drawBricks()
    ballX = ballX + ballXChange
    ballY = ballY + ballYChange
}

setInterval(gameLoop, 10)
