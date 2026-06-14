const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let gameMode = "ai"

let playerY = 200
let opponentY = 200

let playerHeight = 80
let opponentHeight = 80

let ballX = 450
let ballY = 250

let ballDX = 5
let ballDY = 4

let pScore = 0
let aScore = 0

let gameStarted = false

const keys = {}

document.addEventListener("keydown", e=>{
  keys[e.key] = true
})

document.addEventListener("keyup", e=>{
  keys[e.key] = false
})

function startGame(mode){
  gameMode = mode
  document.getElementById("menu").style.display="none"
  gameStarted = true
}

function resetBall(){
  ballX = 450
  ballY = 250
  ballDX *= -1
}

function spawnPowerup(){

  const random = Math.floor(Math.random()*2)

  if(random===0){
    playerHeight = 130

    setTimeout(()=>{
      playerHeight = 80
    },5000)
  }

  if(random===1){
    ballDX *= 1.3
    ballDY *= 1.3
  }
}

setInterval(()=>{
  if(gameStarted){
    spawnPowerup()
  }
},15000)

function update(){

  if(!gameStarted) return

  if(keys["w"]) playerY -= 7
  if(keys["s"]) playerY += 7

  if(gameMode==="multi"){
    if(keys["ArrowUp"]) opponentY -= 7
    if(keys["ArrowDown"]) opponentY += 7
  }
  else{
    opponentY += (ballY - opponentY - 40) * 0.08
  }

  ballX += ballDX
  ballY += ballDY

  if(ballY <= 0 || ballY >= canvas.height){
    ballDY *= -1
  }

  if(
    ballX <= 25 &&
    ballY > playerY &&
    ballY < playerY + playerHeight
  ){
    ballDX *= -1
  }

  if(
    ballX >= 875 &&
    ballY > opponentY &&
    ballY < opponentY + opponentHeight
  ){
    ballDX *= -1
  }

  if(ballX < 0){
    aScore++
    updateScore()
    resetBall()
  }

  if(ballX > canvas.width){
    pScore++
    updateScore()
    resetBall()
  }

  checkWin()
}

function updateScore(){
  document.getElementById("pScore").textContent = pScore
  document.getElementById("aScore").textContent = aScore
}

function checkWin(){

  if(pScore >= 10){
    document.getElementById("status").textContent =
      "PLAYER 1 WINS THE GALAXY!"
    gameStarted = false
  }

  if(aScore >= 10){
    document.getElementById("status").textContent =
      gameMode==="multi"
      ? "PLAYER 2 WINS THE GALAXY!"
      : "AI WINS THE GALAXY!"
    gameStarted = false
  }
}

const stars = []

for(let i=0;i<100;i++){
  stars.push({
    x:Math.random()*900,
    y:Math.random()*500,
    size:Math.random()*3
  })
}

function drawStars(){

  for(const star of stars){

    ctx.fillStyle="white"

    ctx.fillRect(
      star.x,
      star.y,
      star.size,
      star.size
    )
  }
}

function draw(){

  ctx.clearRect(0,0,900,500)

  drawStars()

  ctx.fillStyle="cyan"
  ctx.fillRect(10,playerY,12,playerHeight)

  ctx.fillStyle="magenta"
  ctx.fillRect(
    878,
    opponentY,
    12,
    opponentHeight
  )

  ctx.beginPath()
  ctx.fillStyle="white"
  ctx.arc(ballX,ballY,8,0,Math.PI*2)
  ctx.fill()
}

function gameLoop(){

  update()
  draw()

  requestAnimationFrame(gameLoop)
}

gameLoop()
