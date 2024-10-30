const victory = new Audio("../../assets/audio/victory.mp3");

function gameWin(point, enemyKill) {
    clearInstruction("display");
    clearInstruction("bombAlert");
    theme.pause();
    theme.currentTime = 0;
    app.off("update");
    victory.play();
    const gameWinMessage = document.createElement("div");
    gameWinMessage.id = "gameWinMessage";
    gameWinMessage.style.position = "absolute";
    gameWinMessage.style.top = "50%";
    gameWinMessage.style.left = "50%";
    gameWinMessage.style.transform = "translate(-50%, -50%)";
    gameWinMessage.style.fontFamily = "fantasy";
    gameWinMessage.style.fontSize = "50px";
    gameWinMessage.style.color = "white";
    gameWinMessage.style.textAlign = "center";
    gameWinMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    gameWinMessage.style.padding = "10px"; 
    gameWinMessage.style.backgroundImage = "url('../../assets/image/win.gif')"; 
    gameWinMessage.style.backgroundSize = "cover";
    gameWinMessage.style.borderRadius = "10px";
    gameWinMessage.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)"; 
    gameWinMessage.innerHTML = `YOU WIN<br><br>Point: ${point}<br>Enemy Kill: ${enemyKill}<br>Press R to Restart`;
    document.body.appendChild(gameWinMessage);

    document.body.addEventListener("keydown", (event) => {
        if (event.key === "r" || event.key === "R") {
            window.location.href = "./index.html";
        }
    });
}
