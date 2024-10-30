
function display(enemyKill, point, bombNumber, live, targetKill) {
    const progressPercentage = (enemyKill / targetKill) * 100;

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
    }

    const infoText = document.getElementById("infoText");
    infoText.innerHTML = `Live: ${live}<br>Point: ${point}<br>Number of Bomb: ${bombNumber}<br>Enemy Kill: ${enemyKill}`;
    
    const statusBarFill = document.getElementById("statusBarFill");
    if (statusBarFill) {
        statusBarFill.style.width = `${progressPercentage}%`;
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
    bombAlert.style.backgroundSize = "cover";
    bombAlert.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(bombAlert);
    bombAlert.innerHTML = `ATTENTION!! OUT OF BOMB<br> Bomb obstacles to get more`;  
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
    enemyInstruction.style.color = "white";
    enemyInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    enemyInstruction.style.padding = "10px"; 
    enemyInstruction.style.borderRadius = "10px";
    enemyInstruction.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
    enemyInstruction.style.backgroundSize = "cover";
    enemyInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(enemyInstruction);
    enemyInstruction.innerHTML = `Avoid enemy bomb and bomb them to fill<br>the status bar to call the stage's boss`;
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
    moveInstruction.style.color = "white";
    moveInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    moveInstruction.style.padding = "10px"; 
    moveInstruction.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
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
    moveInstruction.style.color = "white";
    moveInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    moveInstruction.style.padding = "10px"; 
    moveInstruction.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
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
    moveInstruction.style.color = "white";
    moveInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    moveInstruction.style.padding = "10px"; 
    moveInstruction.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
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
    moveInstruction.style.color = "white";
    moveInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    moveInstruction.style.padding = "10px"; 
    moveInstruction.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
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
    obstaclesInstruction.style.color = "white";
    obstaclesInstruction.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
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
    bombInstruction.style.color = "white";
    bombInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    bombInstruction.style.padding = "10px"; 
    bombInstruction.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
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
    bossInstruction.style.color = "white";
    bossInstruction.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    bossInstruction.style.padding = "10px"; 
    bossInstruction.style.backgroundImage = "url('../../assets/image/ins.jpg')"; 
    bossInstruction.style.backgroundSize = "cover";
    bossInstruction.style.borderRadius = "10px";
    bossInstruction.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    document.body.appendChild(bossInstruction);
    bossInstruction.innerHTML = `Drop bomb to kill the boss and win the stage`;
}

function clearInstruction(ins) {
    let instruction = document.getElementById(ins);
    if (instruction) {
        instruction.remove(); 
    }
}