

const mainS = new Audio("../../assets/audio/main.mp3");

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
            
            let t = 1; 
            if (Math.random() <= 0.2) { 
                t = 2;
            }
            
            if (Math.random() <= 0.2 && itemCount <= 8) { 
                createItem(obstaclePosition.x, obstaclePosition.z, t, items);
                itemCount += 1;
            }

            point += 10;
            bombNumber += 1;
        }
    }
}


function checkForItem(items, characters, blastRadius) {
    for (let i = items.length - 1; i >= 0; i--) {
        const character = characters[0];
        const item = items[i];
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
                    setTimeout(() => {
                        clearInstruction("liveAlert");
                    }, 1000);
                    break;

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
        }

        if (bossLive == 0) {
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
