

const mainS = new Audio("../../assets/audio/main.mp3");
const itemS = new Audio("../../assets/audio/item.wav");
const dieS = new Audio("../../assets/audio/oh.wav");
const dieS2 = new Audio("../../assets/audio/dieB.wav");
const dieS3 = new Audio("../../assets/audio/dieC.wav");
const explosionS = new Audio("../../assets/audio/explosion.wav");
const bossS = new Audio("../../assets/audio/boss.wav");



function checkForDestruction(obstacles, bombPosition, blastRadius, items) {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        const obstaclePosition = obstacle.getPosition();
        const distance = bombPosition.distance(obstaclePosition);

        if (distance <= blastRadius) {
            obstacle.destroy();
            obstacles.splice(i, 1);
            clearInstruction("obstaclesInstruction");
            console.log("Destroyed obstacle at", obstaclePosition);
            
            let rand = Math.random();
            let t;
            if (rand <= 0.05) {
                t = 6;
            } else if (rand <= 0.13) {
                t = 7;
            } else if (rand <= 0.23) {
                t = 2;
            } else if (rand <= 0.35) {
                t = 5;
            } else if (rand <= 0.5) {
                t = 1;
            } else if (rand <= 0.65) {
                t = 3;
            }
            else if (rand <= 0.8) {
                t = 4;
            } else {
                t = 8;
            }
            if (Math.random() <= 0.25 && itemCount <= 10) { 
                createItem(obstaclePosition.x, obstaclePosition.z, t, items);
                itemCount += 1;
            }

            point += 10;
            bombNumber += 1;
        }
    }
}

function checkForEnemy(items, enemies, blastRadius) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        for (let j = items.length - 1; j >= 0; j--) {
            const enemy = enemies[i];
            const item = items[j];
            const itemPosition = item.getPosition();
            const enemyPosition = enemy.getPosition();
            const distance = enemyPosition.distance(itemPosition);

            if (distance <= blastRadius) {
                item.destroy();
                items.splice(j, 1);
                console.log("Destroyed item at", itemPosition);
                switch (item.itemType) {
                    case 9: 
                        enemy.destroy();
                        enemies.splice(i, 1);
                        if (isVolumeOn) {
                            const randomDieSound = Math.floor(Math.random() * 2) + 1;
                            if (randomDieSound === 1) {
                                dieS.play();
                            } else if (randomDieSound === 2) {
                                dieS2.play();
                            }
                        }
                        clearInterval(enemy.enemyBombInterval);
                        console.log("Destroyed enemy at", itemPosition);
                        enemyKill += 1;
                        point += 50;
                        break;
                }
            }
        }
    }
}

function checkForBoss(items, bosses, blastRadius) {
    for (let i = items.length - 1; i >= 0; i--) {
        const boss = bosses[0];
        const item = items[i];
        const itemPosition = item.getPosition();
        const bossPosition = boss.getPosition();
        const distance = bossPosition.distance(itemPosition);

        if (distance <= blastRadius) {
            item.destroy();
            items.splice(i, 1);
            console.log("Destroyed item at", itemPosition);
            switch (item.itemType) {
                case 9: 
                    bossLive -= 0.5;
                    point += 10;
                    if (isVolumeOn) {
                        dieS3.play();
                    }
                    break;
                case 8: 
                bossLive += 0.25;
                if (bossLive >= 8){
                    bossLive = 8;
                }
                if (isVolumeOn){
                    bossS.play();
                }
                break;
            }
        }
    }
    
}

function checkForItem(items, characters, blastRadius) {
    for (let i = items.length - 1; i >= 0; i--) {
        const character = characters[0];
        if (items[i].itemType != 9) {
        let item = items[i];
        const itemPosition = item.getPosition();
        const characterPosition = character.getPosition();
        const distance = characterPosition.distance(itemPosition);

        if (distance <= blastRadius) {
            item.destroy();
            items.splice(i, 1);
            console.log("Destroyed item at", itemPosition);
            switch (item.itemType) {
                case 1: 
                    speed = 15;
                    boostAlert();
                    if (isVolumeOn) {
                        itemS.play();
                    }
                    clearInstruction("speedAlert");
                    setTimeout(() => {
                        speed = 12.5;
                        console.log("Speed reset to normal");
                        clearInstruction("boostAlert");
                    }, 5000);
                    break;
                case 2:
                    live += 1;
                    liveAlert();
                    if (isVolumeOn) {
                        itemS.play();
                    }
                    setTimeout(() => {
                        clearInstruction("liveAlert");
                    }, 500);
                    break;
                case 3:
                    bombNumber += 5;
                    x5Alert();
                    if (isVolumeOn) {
                        itemS.play();
                    }
                    setTimeout(() => {
                        clearInstruction("x5Alert");
                    }, 500);
                    break;
                case 4:
                    point += 5;
                    pointAlert();
                    if (isVolumeOn) {
                        itemS.play();
                    }
                    setTimeout(() => {
                        clearInstruction("pointAlert");
                    }, 500);
                    break;
                case 5:
                    if (Math.random() <= 0.4 ) {
                        live += 2;
                        mysteryAlertA();
                        if (isVolumeOn) {
                            itemS.play();
                        }
                    } else {
                        live -= 1;
                        mysteryAlertB();
                        if (isVolumeOn) {
                            mainS.play();
                        }
                    }
                    setTimeout(() => {
                        clearInstruction("mysteryAlertA");
                        clearInstruction("mysteryAlertB");
                    }, 1000);
                    break;
                case 6:
                    enemyKill += 5;
                    if (isVolumeOn) {
                        itemS.play();
                    }
                    starAlert();
                    setTimeout(() => {
                        clearInstruction("starAlert");
                    }, 500);
                    break;
                case 7:
                    specialTree += 5;
                    if (isVolumeOn) {
                        itemS.play();
                    }
                    specialAlert();
                    setTimeout(() => {
                        clearInstruction("specialAlert");
                    }, 500);
                    break;
                case 8:
                live -= 1;
                if (isVolumeOn) {
                mainS.play();
                }
                break;

            }
        }
    }
    }
}

function checkEnemyForDestruction(obstacles, bombPosition, blastRadius) {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        const obstaclePosition = obstacle.getPosition();
        const distance = bombPosition.distance(obstaclePosition);

        if (distance <= blastRadius) {
            obstacle.destroy();
            obstacles.splice(i, 1);
            console.log("Destroyed obstacle at", obstaclePosition);
        }
    }
}

function checkDestroyCharacter(characters, bombPosition, blastRadius) {
    for (let i = characters.length - 1; i >= 0; i--) {
        const character = characters[i];
        const characterPosition = character.getPosition();
        const distance = bombPosition.distance(characterPosition);

        if (distance <= blastRadius) {
            live -= 1;
            speed = 10;
            speedAlert();
            if (isVolumeOn) {
            mainS.play();
            }
        }

        if (live <= 0 || bombNumber <= -1) {
            character.destroy();
            characters.splice(i, 1);
            console.log("Destroyed character at", characterPosition);
            gameOver(enemyKill, point);
            break;
        }
    }
}

function checkDestroyEnemy(enemies, bombPosition, blastRadius) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        const enemyPosition = enemy.getPosition();
        const distance = bombPosition.distance(enemyPosition);

        if (distance <= blastRadius) {
            enemy.destroy();
            enemies.splice(i, 1);
            if (isVolumeOn) {
                explosionS.play();
                const randomDieSound = Math.floor(Math.random() * 2) + 1;
                if (randomDieSound === 1) {
                    dieS.play();
                } else if (randomDieSound === 2) {
                    dieS2.play();
                }
            }
            clearInterval(enemy.enemyBombInterval);
            clearInstruction("enemyInstruction");
            clearInstruction("speedAlert");
            console.log("Destroyed enemy at", enemyPosition);
            speed = 12.5;
            point += 50;
            enemyKill += 1;
        }
    }
}

function checkDestroyBoss(bosses, bombPosition, blastRadius) {
    for (let i = bosses.length - 1; i >= 0; i--) {
        const boss = bosses[i];
        const bossPosition = boss.getPosition();
        const distance = bombPosition.distance(bossPosition);

        if (distance <= blastRadius) {
            bossLive -= 1;
            point += 20;
            if (isVolumeOn){
              explosionS.play();
              dieS3.play();
            }
        }

        if (bossLive <= 0) {
            boss.destroy();
            bosses.splice(i, 1);
            clearInterval(boss.enemyBombInterval);
            console.log("Destroyed boss at", bossPosition);
            point += 100;
            gameWin(point, enemyKill);
            break;
        }
    }
}
