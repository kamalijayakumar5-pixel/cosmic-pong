const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let playerY = 150
let aiY = 150

let ballX = 400
let ballY = 200
let ballDX = 4
let ballDY = 3

let pScore = 0
let aScore = 0

const pScoreText = document.getElementById("pScore")
const aScoreText = document.getElementById("aScore")

// mouse controls
document.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect()
  playerY = e.clientY - rect.top - 40
})

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

function drawBall(x, y) {
  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.arc(x, y, 8, 0, Math.PI * 2)
  ctx.fill()
}

function resetBall() {
  ballX = 400
  ballY = 200
  ballDX = -ballDX
}

function update() {

  // ball movement
  ballX += ballDX
  ballY += ballDY

  // top/bottom bounce
  if (ballY <= 0 || ballY >= 400) {
    ballDY *= -1
  }

  // player paddle collision
  if (
    ballX <= 20 &&
    ballY > playerY &&
    ballY < playerY + 80
  ) {
    ballDX *= -1
  }

  // AI paddle collision
  if (
    ballX >= 780 &&
    ballY > aiY &&
    ballY < aiY + 80
  ) {
    ballDX *= -1
  }

  // scoring
  if (ballX < 0) {
    aScore++
    aScoreText.textContent = aScore
    resetBall()
  }

  if (ballX > 800) {
    pScore++
    pScoreText.textContent = pScore
    resetBall()
  }

  // AI movement (simple tracking)
  aiY += (ballY - aiY - 40) * 0.05
}

function draw() {
  ctx.clearRect(0, 0, 800, 400)

  // paddles
  drawRect(10, playerY, 10, 80, "white")
  drawRect(780, aiY, 10, 80, "white")

  // ball
  drawBall(ballX, ballY)
}

function loop() {
  update()
  draw()
  requestAnimationFrame(loop)
}

loop()
