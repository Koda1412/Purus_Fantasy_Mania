
const over = new Audio("../../assets/audio/lose.mp3");

function gameOver(enemyKill, point) {

    isPause = true;
    clearInstruction("display");    
    clearInstruction("enemyInstruction");
    clearInstruction("moveInstructionA");
    clearInstruction("moveInstructionW");
    clearInstruction("moveInstructionS");
    clearInstruction("moveInstructionD");
    clearInstruction("bombInstruction");
    clearInstruction("obstaclesInstruction");
    clearInstruction("bombAlert");
    clearInstruction("displayBoss");
    clearInstruction("bossInstruction");
    clearInstruction("pauseButton"); 
    clearInstruction("speedAlert"); 
    
    theme.pause();
    theme.currentTime = 0;
    app.off("update");
    over.play();

    updateHighScore();
    const gameOverMessage = document.createElement("div");
    gameOverMessage.id = "gameOverMessage";
    gameOverMessage.style.position = "absolute";
    gameOverMessage.style.top = "50%";
    gameOverMessage.style.left = "50%";
    gameOverMessage.style.transform = "translate(-50%, -50%)";
    gameOverMessage.style.fontFamily = "fantasy";
    gameOverMessage.style.fontSize = "50px";
    gameOverMessage.style.color = "white";
    gameOverMessage.style.textAlign = "center";
    gameOverMessage.style.backgroundImage = "url('../../assets/image/lose.gif')"; 
    gameOverMessage.style.backgroundSize = "contain";
    gameOverMessage.style.padding = "10px"; 
    gameOverMessage.style.borderRadius = "10px";
    gameOverMessage.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)"; 
    gameOverMessage.innerHTML = `GAME OVER<br><br>Point: ${point}<br>High Score: ${highScore}<br>Enemy Kill: ${enemyKill}<br>Press R to Restart`;
    document.body.appendChild(gameOverMessage);

    document.body.addEventListener("keydown", (event) => {
        if (event.key === "r" || event.key === "R") {
            window.location.href = "./index.html";
        }
    });
}
