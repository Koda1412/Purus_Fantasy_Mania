
function display(enemyKill, point, bombNumber, live, targetKill, highscore) {
    let progressPercentage = (enemyKill / targetKill) * 100;
    if (progressPercentage > 100) {
        progressPercentage = 100; 
    }

    let display = document.getElementById("display");
    if (!display) {
        display = document.createElement("div");
        display.id = "display";
        display.style.position = "absolute";
        display.style.top = "2%";
        display.style.left = "2%";
        display.style.fontFamily = "fantasy";
        display.style.fontSize = "20px";
        display.style.color = "white";
        display.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        display.style.backgroundImage = "url('../../assets/image/display.jpg')";
        display.style.backgroundSize = "cover";
        display.style.padding = "10px";
        display.style.borderRadius = "10px";
        display.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
        document.body.appendChild(display);

        const infoText = document.createElement("div");
        infoText.id = "infoText";
        display.appendChild(infoText);

        const statusBarContainer = document.createElement("div");
        statusBarContainer.style.width = "100%";
        statusBarContainer.style.height = "20px";
        statusBarContainer.style.backgroundColor = "#444";
        statusBarContainer.style.borderRadius = "5px";
        statusBarContainer.style.marginTop = "10px";

        const statusBarFill = document.createElement("div");
        statusBarFill.id = "statusBarFill";
        statusBarFill.style.height = "100%";
        statusBarFill.style.width = "0%";
        statusBarFill.style.backgroundColor = "green";
        statusBarFill.style.borderRadius = "5px";

        statusBarContainer.appendChild(statusBarFill);
        display.appendChild(statusBarContainer);

        const highscoreMessage = document.createElement("div");
        highscoreMessage.id = "highscoreMessage";
        highscoreMessage.style.color = "white";
        highscoreMessage.style.fontFamily = "fantasy";
        highscoreMessage.style.marginTop = "5px";
        display.appendChild(highscoreMessage);
    }

    const infoText = document.getElementById("infoText");
    const highscoreMessage = document.getElementById("highscoreMessage");

    if (point > highscore) {
        infoText.innerHTML = `Live: ${live}<br><span style="color: yellow;">Point: ${point}</span><br>Number of Bomb: ${bombNumber}<br>Enemy Kill: ${enemyKill}`;
        highscoreMessage.innerText = "You reached highscore!";
    } else {
        infoText.innerHTML = `Live: ${live}<br>Point: ${point}<br>Number of Bomb: ${bombNumber}<br>Enemy Kill: ${enemyKill}`;
        highscoreMessage.innerText = "";
    }
    
    const statusBarFill = document.getElementById("statusBarFill");
    if (statusBarFill) {
        statusBarFill.style.width = `${progressPercentage}%`;
        if (progressPercentage === 100) {
            statusBarFill.style.backgroundColor = "yellow";
        } else {
            statusBarFill.style.backgroundColor = "green";
        }
    }
}

function displaySpecial(specialTree) {
    let displaySpecial = document.getElementById("displaySpecial");
    if (!displaySpecial && specialTree > 0) {
        displaySpecial = document.createElement("div");
        displaySpecial.id = "displaySpecial";
        displaySpecial.style.position = "absolute";
        displaySpecial.style.top = "27.5%";
        displaySpecial.style.left = "2%";
        displaySpecial.style.fontFamily = "fantasy";
        displaySpecial.style.fontSize = "15px";
        displaySpecial.style.color = "white";
        displaySpecial.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        displaySpecial.style.backgroundImage = "url('../../assets/image/special.jpg')";
        displaySpecial.style.backgroundSize = "contain";
        displaySpecial.style.padding = "10px";
        displaySpecial.style.borderRadius = "10px";
        displaySpecial.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
        displaySpecial.style.zIndex = "1000";
        document.body.appendChild(displaySpecial);

        const infoTextSpecial = document.createElement("div");
        infoTextSpecial.id = "infoTextSpecial";
        displaySpecial.appendChild(infoTextSpecial);
    }

    const infoText = document.getElementById("infoTextSpecial");

    if (infoText) {
        infoText.innerHTML = `Number of Cherry Blossom: ${specialTree}<br>Press P to spawn cherry blossom, enemy chase it will die`;
    }
}



function displayBoss(bossLive) {
    const progressBossPercentage = (bossLive / 8) * 100;

    let displayBoss = document.getElementById("displayBoss");
    if (!displayBoss) {
        displayBoss = document.createElement("div");
        displayBoss.id = "displayBoss";
        displayBoss.style.position = "absolute";
        displayBoss.style.top = "2%";
        displayBoss.style.left = "86.5%";
        displayBoss.style.fontFamily = "fantasy";
        displayBoss.style.fontSize = "20px";
        displayBoss.style.color = "white";
        displayBoss.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        displayBoss.style.backgroundImage = "url('../../assets/image/bossDisplay.jpg')";
        displayBoss.style.backgroundSize = "cover";
        displayBoss.style.padding = "10px";
        displayBoss.style.borderRadius = "10px";
        displayBoss.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
        document.body.appendChild(displayBoss);

        const infoBossText = document.createElement("div");
        infoBossText.id = "infoBossText";
        displayBoss.appendChild(infoBossText);

        const statusBarBossContainer = document.createElement("div");
        statusBarBossContainer.style.width = "100%";
        statusBarBossContainer.style.height = "20px";
        statusBarBossContainer.style.backgroundColor = "#444";
        statusBarBossContainer.style.borderRadius = "5px";
        statusBarBossContainer.style.marginTop = "10px";

        const statusBarBossFill = document.createElement("div");
        statusBarBossFill.id = "statusBarBossFill";
        statusBarBossFill.style.height = "100%";
        statusBarBossFill.style.width = "0%";
        statusBarBossFill.style.backgroundColor = "red";
        statusBarBossFill.style.borderRadius = "5px";

        statusBarBossContainer.appendChild(statusBarBossFill);
        displayBoss.appendChild(statusBarBossContainer);
    }

    const infoBossText = document.getElementById("infoBossText");
    infoBossText.innerHTML = `Stage's Boss HP`;
    
    const statusBarBossFill = document.getElementById("statusBarBossFill");
    if (statusBarBossFill) {
        statusBarBossFill.style.width = `${progressBossPercentage}%`;
    }
}


function boostAlert() {
    let boostAlert = document.getElementById("boostAlert");
    if (!boostAlert) {
    boostAlert = document.createElement("div");
    boostAlert.id = "boostAlert";
    boostAlert.style.position = "absolute";
    boostAlert.style.top = "43.5%";
    boostAlert.style.left = "39%";
    boostAlert.style.fontFamily = "fantasy";
    boostAlert.style.fontSize = "20px";
    boostAlert.style.color = "white";
    boostAlert.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    boostAlert.style.padding = "10px"; 
    boostAlert.style.borderRadius = "10px";
    boostAlert.style.backgroundImage = "url('../../assets/image/special.jpg')"; 
    boostAlert.style.backgroundSize = "cover";
    boostAlert.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(boostAlert);
    boostAlert.innerHTML = `Speed Boost`;  
    }
}

function specialAlert() {
    let specialAlert = document.getElementById("specialAlert");
    if (!specialAlert) {
    specialAlert = document.createElement("div");
    specialAlert.id = "specialAlert";
    specialAlert.style.position = "absolute";
    specialAlert.style.top = "43.5%";
    specialAlert.style.left = "36%";
    specialAlert.style.fontFamily = "fantasy";
    specialAlert.style.fontSize = "20px";
    specialAlert.style.color = "white";
    specialAlert.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    specialAlert.style.padding = "10px"; 
    specialAlert.style.borderRadius = "10px";
    specialAlert.style.backgroundImage = "url('../../assets/image/special.jpg')"; 
    specialAlert.style.backgroundSize = "contain";
    specialAlert.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(specialAlert);
    specialAlert.innerHTML = `+5 Cherry Blossom`;  
    }
}

function liveAlert() {
    let liveAlert = document.getElementById("liveAlert");
    if (!liveAlert) {
    liveAlert = document.createElement("div");
    liveAlert.id = "liveAlert";
    liveAlert.style.position = "absolute";
    liveAlert.style.top = "43.5%";
    liveAlert.style.left = "42%";
    liveAlert.style.fontFamily = "fantasy";
    liveAlert.style.fontSize = "20px";
    liveAlert.style.color = "white";
    liveAlert.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    liveAlert.style.padding = "10px"; 
    liveAlert.style.borderRadius = "10px";
    liveAlert.style.backgroundImage = "url('../../assets/image/blue.jpg')"; 
    liveAlert.style.backgroundSize = "cover";
    liveAlert.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(liveAlert);
    liveAlert.innerHTML = `+1 Live`;  
    }
}

function mysteryAlertA() {
    let mysteryAlertA = document.getElementById("mysteryAlertA");
    if (!mysteryAlertA) {
    mysteryAlertA = document.createElement("div");
    mysteryAlertA.id = "mysteryAlertA";
    mysteryAlertA.style.position = "absolute";
    mysteryAlertA.style.top = "43.5%";
    mysteryAlertA.style.left = "42%";
    mysteryAlertA.style.fontFamily = "fantasy";
    mysteryAlertA.style.fontSize = "20px";
    mysteryAlertA.style.color = "white";
    mysteryAlertA.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    mysteryAlertA.style.padding = "10px"; 
    mysteryAlertA.style.borderRadius = "10px";
    mysteryAlertA.style.backgroundImage = "url('../../assets/image/blue.jpg')"; 
    mysteryAlertA.style.backgroundSize = "contain";
    mysteryAlertA.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(mysteryAlertA);
    mysteryAlertA.innerHTML = `+2 Live`;  
    }
}

function mysteryAlertB() {
    let mysteryAlertB = document.getElementById("mysteryAlertB");
    if (!mysteryAlertB) {
    mysteryAlertB = document.createElement("div");
    mysteryAlertB.id = "mysteryAlertB";
    mysteryAlertB.style.position = "absolute";
    mysteryAlertB.style.top = "43.5%";
    mysteryAlertB.style.left = "42%";
    mysteryAlertB.style.fontFamily = "fantasy";
    mysteryAlertB.style.fontSize = "20px";
    mysteryAlertB.style.color = "white";
    mysteryAlertB.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    mysteryAlertB.style.padding = "10px"; 
    mysteryAlertB.style.borderRadius = "10px";
    mysteryAlertB.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
    mysteryAlertB.style.backgroundSize = "contain";
    mysteryAlertB.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(mysteryAlertB);
    mysteryAlertB.innerHTML = `-1 Live`;  
    }
}

function pointAlert() {
    let pointAlert = document.getElementById("pointAlert");
    if (!pointAlert) {
    pointAlert = document.createElement("div");
    pointAlert.id = "pointAlert";
    pointAlert.style.position = "absolute";
    pointAlert.style.top = "43.5%";
    pointAlert.style.left = "40%";
    pointAlert.style.fontFamily = "fantasy";
    pointAlert.style.fontSize = "20px";
    pointAlert.style.color = "white";
    pointAlert.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    pointAlert.style.padding = "10px"; 
    pointAlert.style.borderRadius = "10px";
    pointAlert.style.backgroundImage = "url('../../assets/image/blue.jpg')"; 
    pointAlert.style.backgroundSize = "cover";
    pointAlert.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(pointAlert);
    pointAlert.innerHTML = `+500 Point`;  
    }
}

function x5Alert() {
    let x5Alert = document.getElementById("x5Alert");
    if (!x5Alert) {
    x5Alert = document.createElement("div");
    x5Alert.id = "x5Alert";
    x5Alert.style.position = "absolute";
    x5Alert.style.top = "43.5%";
    x5Alert.style.left = "41%";
    x5Alert.style.fontFamily = "fantasy";
    x5Alert.style.fontSize = "20px";
    x5Alert.style.color = "white";
    x5Alert.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    x5Alert.style.padding = "10px"; 
    x5Alert.style.borderRadius = "10px";
    x5Alert.style.backgroundImage = "url('../../assets/image/blue.jpg')"; 
    x5Alert.style.backgroundSize = "cover";
    x5Alert.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(x5Alert);
    x5Alert.innerHTML = `+5 Bomb`;  
    }
}

function starAlert() {
    let starAlert = document.getElementById("starAlert");
    if (!starAlert) {
    starAlert = document.createElement("div");
    starAlert.id = "starAlert";
    starAlert.style.position = "absolute";
    starAlert.style.top = "43.5%";
    starAlert.style.left = "38.5%";
    starAlert.style.fontFamily = "fantasy";
    starAlert.style.fontSize = "20px";
    starAlert.style.color = "white";
    starAlert.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    starAlert.style.padding = "10px"; 
    starAlert.style.borderRadius = "10px";
    starAlert.style.backgroundImage = "url('../../assets/image/special.jpg')"; 
    starAlert.style.backgroundSize = "cover";
    starAlert.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(starAlert);
    starAlert.innerHTML = `+5 Enemy Kill`;  
    }
}

function bombAlert() {
    let bombAlert = document.getElementById("bombAlert");
    if (!bombAlert) {
    bombAlert = document.createElement("div");
    bombAlert.id = "bombAlert";
    bombAlert.style.position = "absolute";
    bombAlert.style.top = "30%";
    bombAlert.style.left = "42%";
    bombAlert.style.fontFamily = "fantasy";
    bombAlert.style.fontSize = "20px";
    bombAlert.style.color = "white";
    bombAlert.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    bombAlert.style.padding = "10px";
    bombAlert.style.borderRadius = "10px";
    bombAlert.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
    bombAlert.style.backgroundSize = "contain";
    bombAlert.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(bombAlert);
    bombAlert.innerHTML = `ATTENTION!! OUT OF BOMB<br> Bomb obstacles to get more`;  
    }
}

function speedAlert() {
    let speedAlert = document.getElementById("speedAlert");
    if (!speedAlert) {
    speedAlert = document.createElement("div");
    speedAlert.id = "speedAlert";
    speedAlert.style.position = "absolute";
    speedAlert.style.top = "42.5%";
    speedAlert.style.left = "55%";
    speedAlert.style.fontFamily = "fantasy";
    speedAlert.style.fontSize = "15px";
    speedAlert.style.color = "white";
    speedAlert.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    speedAlert.style.padding = "10px"; 
    speedAlert.style.borderRadius = "10px";
    speedAlert.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
    speedAlert.style.backgroundSize = "contain";
    speedAlert.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(speedAlert);
    speedAlert.innerHTML = `ATTENTION!! Speed decrease<br> Bomb enemy to get normal`;  
    }
}



function enemyInstruction() {
    let enemyInstruction = document.getElementById("enemyInstruction");
    enemyInstruction = document.createElement("div");
    enemyInstruction.id = "enemyInstruction";
    enemyInstruction.style.position = "absolute";
    enemyInstruction.style.top = "80%";
    enemyInstruction.style.left = "75%";
    enemyInstruction.style.fontFamily = "fantasy";
    enemyInstruction.style.fontSize = "15px";
    enemyInstruction.style.color = "black";
    enemyInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    enemyInstruction.style.padding = "10px"; 
    enemyInstruction.style.borderRadius = "10px";
    enemyInstruction.style.backgroundImage = "url('../../assets/image/yellow.jpg')"; 
    enemyInstruction.style.backgroundSize = "cover";
    enemyInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(enemyInstruction);
    enemyInstruction.innerHTML = `Avoid enemy bomb and mushroom, bomb them to fill<br>the status bar to call the stage's boss`;
}

function moveInstructionA() {
    let moveInstruction = document.getElementById("moveInstructionA");
    moveInstruction = document.createElement("div");
    moveInstruction.id = "moveInstructionA";
    moveInstruction.style.position = "absolute";
    moveInstruction.style.top = "50%";
    moveInstruction.style.left = "75%";
    moveInstruction.style.fontFamily = "fantasy";
    moveInstruction.style.fontSize = "15px";
    moveInstruction.style.color = "black";
    moveInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    moveInstruction.style.padding = "10px"; 
    moveInstruction.style.backgroundImage = "url('../../assets/image/yellow.jpg')"; 
    moveInstruction.style.backgroundSize = "cover";
    moveInstruction.style.borderRadius = "10px";
    moveInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(moveInstruction);
    moveInstruction.innerHTML = `Press A To Moove Left`;
}

function moveInstructionW() {
    let moveInstruction = document.getElementById("moveInstructionW");
    moveInstruction = document.createElement("div");
    moveInstruction.id = "moveInstructionW";
    moveInstruction.style.position = "absolute";
    moveInstruction.style.top = "50%";
    moveInstruction.style.left = "75%";
    moveInstruction.style.fontFamily = "fantasy";
    moveInstruction.style.fontSize = "15px";
    moveInstruction.style.color = "black";
    moveInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    moveInstruction.style.padding = "10px"; 
    moveInstruction.style.backgroundImage = "url('../../assets/image/yellow.jpg')"; 
    moveInstruction.style.backgroundSize = "cover";
    moveInstruction.style.borderRadius = "10px";
    moveInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(moveInstruction);
    moveInstruction.innerHTML = `Press W To Move Upppp`;
}

function moveInstructionS() {
    let moveInstruction = document.getElementById("moveInstructionS");
    moveInstruction = document.createElement("div");
    moveInstruction.id = "moveInstructionS";
    moveInstruction.style.position = "absolute";
    moveInstruction.style.top = "50%";
    moveInstruction.style.left = "75%";
    moveInstruction.style.fontFamily = "fantasy";
    moveInstruction.style.fontSize = "15px";
    moveInstruction.style.color = "black";
    moveInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    moveInstruction.style.padding = "10px"; 
    moveInstruction.style.backgroundImage = "url('../../assets/image/yellow.jpg')"; 
    moveInstruction.style.backgroundSize = "cover";
    moveInstruction.style.borderRadius = "10px";
    moveInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(moveInstruction);
    moveInstruction.innerHTML = `Press S To Moove Down`;
}

function moveInstructionD() {
    let moveInstruction = document.getElementById("moveInstructionD");
    moveInstruction = document.createElement("div");
    moveInstruction.id = "moveInstructionD";
    moveInstruction.style.position = "absolute";
    moveInstruction.style.top = "50%";
    moveInstruction.style.left = "75%";
    moveInstruction.style.fontFamily = "fantasy";
    moveInstruction.style.fontSize = "15px";
    moveInstruction.style.color = "black";
    moveInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    moveInstruction.style.padding = "10px"; 
    moveInstruction.style.backgroundImage = "url('../../assets/image/yellow.jpg')"; 
    moveInstruction.style.backgroundSize = "cover";
    moveInstruction.style.borderRadius = "10px";
    moveInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(moveInstruction);
    moveInstruction.innerHTML = `Press D To Move Right`;
}

function obstaclesInstruction() {
    let obstaclesInstruction = document.getElementById("obstaclesInstruction");
    obstaclesInstruction = document.createElement("div");
    obstaclesInstruction.id = "obstaclesInstruction";
    obstaclesInstruction.style.position = "absolute";
    obstaclesInstruction.style.top = "70%";
    obstaclesInstruction.style.left = "75%";
    obstaclesInstruction.style.fontFamily = "fantasy";
    obstaclesInstruction.style.fontSize = "15px";
    obstaclesInstruction.style.color = "black";
    obstaclesInstruction.style.backgroundImage = "url('../../assets/image/yellow.jpg')"; 
    obstaclesInstruction.style.backgroundSize = "cover";
    obstaclesInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    obstaclesInstruction.style.padding = "10px"; 
    obstaclesInstruction.style.borderRadius = "10px";
    obstaclesInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(obstaclesInstruction);
    obstaclesInstruction.innerHTML = `Drop bomb obstacles to get more bomb<br> If u loose all bomb, u loose`;
}


function bombInstruction() {
    let bombInstruction = document.getElementById("bombInstruction");
    bombInstruction = document.createElement("div");
    bombInstruction.id = "bombInstruction";
    bombInstruction.style.position = "absolute";
    bombInstruction.style.top = "60%";
    bombInstruction.style.left = "75%";
    bombInstruction.style.fontFamily = "fantasy";
    bombInstruction.style.fontSize = "15px";
    bombInstruction.style.color = "black";
    bombInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    bombInstruction.style.padding = "10px"; 
    bombInstruction.style.backgroundImage = "url('../../assets/image/yellow.jpg')"; 
    bombInstruction.style.backgroundSize = "cover";
    bombInstruction.style.borderRadius = "10px";
    bombInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(bombInstruction);
    bombInstruction.innerHTML = `Press Space to drop bomb`;
}

function bossInstruction() {
    let bossInstruction = document.getElementById("bossInstruction");
    bossInstruction = document.createElement("div");
    bossInstruction.id = "bombInstruction";
    bossInstruction.style.position = "absolute";
    bossInstruction.style.top = "55%";
    bossInstruction.style.left = "38%";
    bossInstruction.style.fontFamily = "fantasy";
    bossInstruction.style.fontSize = "20px";
    bossInstruction.style.color = "black";
    bossInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    bossInstruction.style.padding = "10px"; 
    bossInstruction.style.backgroundImage = "url('../../assets/image/yellow.jpg')"; 
    bossInstruction.style.backgroundSize = "cover";
    bossInstruction.style.borderRadius = "10px";
    bossInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(bossInstruction);
    bossInstruction.innerHTML = `Drop bomb to kill the boss and win the stage<br> Boss can create mushroom random in map`;
}

function clearInstruction(ins) {
    let instruction = document.getElementById(ins);
    if (instruction) {
        instruction.remove(); 
    }
}

function togglePauseMenu() {
    isPause = !isPause;
    if (isPause) {
        showPauseMenu();
        clearInstruction('pauseButton');
    } else {
        addPauseButton();
        clearInstruction('pauseMenu');
    }
}
function showPauseMenu() {
    let pauseMenu = document.getElementById("pauseMenu");
    if (!pauseMenu) {
        pauseMenu = document.createElement("div");
        pauseMenu.id = "pauseMenu";
        pauseMenu.style.position = "absolute";
        pauseMenu.style.top = "50%";
        pauseMenu.style.left = "50%";
        pauseMenu.style.transform = "translate(-50%, -50%)";
        pauseMenu.style.width = "250px";
        pauseMenu.style.height = "250px";
        pauseMenu.style.color = "white";
        pauseMenu.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        pauseMenu.style.padding = "20px";
        pauseMenu.style.borderRadius = "10px";
        pauseMenu.style.textAlign = "center";
        pauseMenu.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
        pauseMenu.style.backgroundImage = "url('../../assets/image/bossDisplay.jpg')";
        pauseMenu.style.backgroundSize = "cover";
        document.body.appendChild(pauseMenu);

        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.flexDirection = "column"; 
        buttonContainer.style.alignItems = "center"; 
        buttonContainer.style.gap = "10px";
        buttonContainer.style.marginTop = "20px";
        pauseMenu.appendChild(buttonContainer);

        const buttonStyle = {
            width: "150px",
            fontSize: "20px",
            fontFamily: "fantasy",
            padding: "10px"
        };

        const resumeButton = document.createElement("button");
        resumeButton.innerHTML = "Back To Game";
        Object.assign(resumeButton.style, buttonStyle);
        resumeButton.onclick = togglePauseMenu;
        buttonContainer.appendChild(resumeButton);

        const themeButton = document.createElement("button");
        themeButton.id = "themeButton";
        themeButton.innerHTML = isThemeOn ? "Music On" : "Music Off";
        Object.assign(themeButton.style, buttonStyle);
        themeButton.onclick = toggleTheme;
        buttonContainer.appendChild(themeButton);

        const volumeButton = document.createElement("button");
        volumeButton.id = "volumeButton";
        volumeButton.innerHTML = isVolumeOn ? "SFX On" : "SFX Off";
        Object.assign(volumeButton.style, buttonStyle);
        volumeButton.onclick = toggleVolume;
        buttonContainer.appendChild(volumeButton);

        const exitButton = document.createElement("button");
        exitButton.innerHTML = "Exit";
        Object.assign(exitButton.style, buttonStyle);
        exitButton.onclick = function() {
            location.reload();
        };
        buttonContainer.appendChild(exitButton);
    }
}

function toggleVolume() {
    isVolumeOn = !isVolumeOn;
    let volumeButton = document.getElementById("volumeButton");
    volumeButton.innerHTML = isVolumeOn ? "SFX On" : "SFX Off";
}

function toggleTheme() {
    let themeButton = document.getElementById("themeButton");
    
    if (isThemeOn) {
        isThemeOn = !isThemeOn;
        theme.pause();
        themeButton.innerHTML = "Music Off";
    } else {
        isThemeOn = !isThemeOn;
        theme.play();
        themeButton.innerHTML = "Music On";
    }
}

function addPauseButton() {
    let existingButton = document.getElementById("pauseButton");
    if (existingButton) return;

    const pauseButton = document.createElement("button");
    pauseButton.id = "pauseButton";
    pauseButton.innerHTML = "Menu";
    pauseButton.style.position = "absolute";
    pauseButton.style.top = "90%";
    pauseButton.style.left = "2%";
    pauseButton.style.fontFamily = "fantasy";
    pauseButton.style.fontSize = "18px";
    pauseButton.style.padding = "10px";
    pauseButton.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    pauseButton.style.color = "black";
    pauseButton.style.borderRadius = "5px";
    pauseButton.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.5)";
    pauseButton.style.backgroundImage = "url('../../assets/image/yellow.jpg')";
    pauseButton.style.backgroundSize = "cover";
    pauseButton.onclick = togglePauseMenu;
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            togglePauseMenu();
        }
    });
    document.body.appendChild(pauseButton);
}

function updateHighScore() {
    if (point > highScore) {
        highScore = point;
        localStorage.setItem('highScore', highScore);
        console.log("New high score:", highScore);
    }
}

function resetScore() {
    updateHighScore(); 
    point = 0;  
}
