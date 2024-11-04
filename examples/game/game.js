
// Initialize variables
let app;
// Default game setting

let specialTree = 0;
let itemCount = 0;
let speed = 12.5; 
let isPause = false;
let isVolumeOn = true;
let isThemeOn = true;
let currentScene;
let enemyKill = 0;
let point = 0;
let bombNumber = 5;
let live = 2;
let bossLive = 8;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;


const theme = new Audio("../../assets/audio/themes.mp3");

// Function to start the game
function startGame(scene) {
    currentScene = scene;
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    initializeGame();
}

// Function to initialize the game
function initializeGame() {
    const canvas = document.getElementById("gameCanvas");

    app = new pc.Application(canvas, {
        mouse: new pc.Mouse(canvas),
        touch: new pc.TouchDevice(canvas)
    });

    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    window.addEventListener("resize", () => app.resizeCanvas());

    
    app.start();

    theme.volume = 0.5;
    theme.loop = true;
    theme.play();

    // Setup camera
    const cameraEntity = new pc.Entity("MainCamera");
    cameraSetup(cameraEntity, currentScene);
    // Asset loading
    const assetListLoader = new pc.AssetListLoader(Object.values(assets), app.assets);
    assetListLoader.load(() => {
        console.log("Assets loaded");
        createPlane();
        const characters = [];

        const characterEntity = new pc.Entity("Character");
        characterEntity.addComponent("model", {
            type: "asset",
            asset: assets.charModelAsset
        });
        characterEntity.setLocalScale(2, 2, 2);
        app.root.addChild(characterEntity);

        characters.push(characterEntity);
        characterEntity.addComponent("animation", {
            assets: [assets.charIdleAnimationAsset, assets.charRunAnimationAsset, assets.charAttackAnimationAsset],
            });
        let currentAnim = assets.charIdleAnimationAsset.name;

        const charMaterial = characterEntity.model.meshInstances[0].material;
        if (charMaterial && assets.charTextureAsset.resource) {
            charMaterial.diffuseMap = assets.charTextureAsset.resource;
            charMaterial.update();
        } else {
            console.error("Character material or texture failed to load.");
        }

        characterEntity.addComponent("collision", {
            type: "capsule", 
            radius: 0,      
            height: 2       
        });

        characterEntity.addComponent("rigidbody", {
            type: "dynamic", 
            mass: 1
        });

        characterEntity.rigidbody.syncEntityToBody();

        // Initialize keyboard input
        const keyboard = new pc.Keyboard(document.body);

        // Define plane boundaries based on plane scale
        const planeScaleX = 200; 
        const planeScaleZ = 100; 
        const boundaryX = planeScaleX / 2;
        const boundaryZ = planeScaleZ / 2; 

        let velocity = new pc.Vec3();
        app.on("update", (dt) => {
            if (isPause) return;
            checkForItem(items, characters, 2);
            velocity.set(0, 0, 0); 
            if (keyboard.isPressed(pc.KEY_W)) {
                velocity.z -= speed;
                clearInstruction("moveInstructionW");
            }
            if (keyboard.isPressed(pc.KEY_S)) {
                velocity.z += speed;
                clearInstruction("moveInstructionS");
            }
            if (keyboard.isPressed(pc.KEY_A)) {
                velocity.x -= speed;
                clearInstruction("moveInstructionA");

            }
            if (keyboard.isPressed(pc.KEY_D)) {
                velocity.x += speed;
                clearInstruction("moveInstructionD");
            }
        
            const moved = keyboard.isPressed(pc.KEY_W) || keyboard.isPressed(pc.KEY_S) || keyboard.isPressed(pc.KEY_A) || keyboard.isPressed(pc.KEY_D);
            if (moved && currentAnim === assets.charIdleAnimationAsset.name) {
            characterEntity.animation?.play(assets.charRunAnimationAsset.name, 0.1);
            currentAnim = assets.charRunAnimationAsset.name;
            }
            else if (!moved && currentAnim === assets.charRunAnimationAsset.name) {
            characterEntity.animation?.play(assets.charIdleAnimationAsset.name, 0.1);
            currentAnim = assets.charIdleAnimationAsset.name;
            }
            if (velocity.length() > 0) {
                velocity.normalize().scale(speed);
        
                const currentPosition = characterEntity.getPosition();
                const targetPosition = new pc.Vec3(currentPosition.x + velocity.x * dt, currentPosition.y, currentPosition.z + velocity.z * dt);
    
                let canMove = true;
        
                obstacles.forEach(obstacle => {
                    if (obstacle.enabled) { 
                        const obstaclePosition = obstacle.getPosition();
                        const distance = targetPosition.distance(obstaclePosition);
        
                        if (distance < 3.25) {
                            canMove = false;
                        }
                    }
                });
        
                if (canMove) {
                    characterEntity.setPosition(targetPosition);
        
                    const angle = Math.atan2(velocity.x, velocity.z) * pc.math.RAD_TO_DEG;
                    characterEntity.setEulerAngles(0, angle, 0);
                }
            }
            const pos = characterEntity.getPosition();
            pos.x = pc.math.clamp(pos.x, -boundaryX, boundaryX);
            pos.z = pc.math.clamp(pos.z, -boundaryZ, boundaryZ);
            characterEntity.setPosition(pos);
        
            const targetPosition = characterEntity.getPosition().clone();
            const cameraPosition = cameraEntity.getPosition();
            const desiredPosition = new pc.Vec3(targetPosition.x, 45, targetPosition.z + 35);
        
            cameraPosition.lerp(cameraPosition, desiredPosition, 0.1);
            cameraEntity.setPosition(cameraPosition);
            cameraEntity.lookAt(targetPosition);
            });
        
        const bombs = [];
        const obstacles = [];
        const enemies = []; 
        const bosses = [];
        const items = [];

        let canCreateBomb = true;
        let canCreateSpecialTree = true;
        const bombSound = new Audio("../../assets/audio/drop_bomb.mp3");
        document.body.addEventListener("keydown", (event) => {
            if (event.code === "Space" && canCreateBomb) {
                if (isVolumeOn) {
                    bombSound.play();
                    }
                characterEntity.animation?.play(assets.charAttackAnimationAsset.name);
                setTimeout(() => {
                    characterEntity.animation?.play(assets.charRunAnimationAsset.name);
                }, 400);
                createBomb(bombs, characterEntity, obstacles, enemies, bosses, items); 
                clearInstruction("bombInstruction");
                clearInstruction("bossInstruction");
                canCreateBomb = false; 
                setTimeout(() => {
                    canCreateBomb = true; 
                }, 2000)
            }
            if (event.code === "KeyP" && specialTree > 0 && canCreateSpecialTree) {
                specialTree -= 1;
                if (isVolumeOn) {
                    bombSound.play();
                    }
                characterEntity.animation?.play(assets.charAttackAnimationAsset.name);
                setTimeout(() => {
                    characterEntity.animation?.play(assets.charRunAnimationAsset.name);
                }, 400);
                createItem(characterEntity.getPosition().x + 2, characterEntity.getPosition().z + 2, 9, items); 
                canCreateSpecialTree = false; 
                setTimeout(() => {
                    canCreateSpecialTree = true; 
                }, 2000)
            }
        });

        // -------------------------------- ENEMY GENERATION -------------------------------------//

        const createEnemy = (type, texture) => {
            const enemyEntity = new pc.Entity("Enemy");
            switch (texture) {
                case 1: 
                enemyEntity.addComponent("model", {
                    type: "asset",
                    asset: assets.enemyModelAsset 
                });
                break;
                case 2:
                enemyEntity.addComponent("model", {
                    type: "asset",
                    asset: assets.enemy2ModelAsset 
                });
                break;
                case 3:
                enemyEntity.addComponent("model", {
                    type: "asset",
                    asset: assets.enemy3ModelAsset 
                });
                break;
                case 4:
                enemyEntity.addComponent("model", {
                    type: "asset",
                    asset: assets.enemy4ModelAsset 
                });
                break;
            }
            enemyEntity.setLocalScale(3, 3, 3);
            enemyEntity.setPosition(Math.random() * 200 - 100, 1, Math.random() * 100 - 50); 
            app.root.addChild(enemyEntity);

            enemyEntity.addComponent("animation", {
                assets: [assets.charRun2AnimationAsset, assets.charAttackAnimationAsset],
            });
            

            enemyEntity.addComponent("collision", {
                type: "capsule",
                radius: 0.5,
                height: 2
            });

            enemyEntity.addComponent("rigidbody", {
                type: "dynamic",
                mass: 1,
                friction: 0.5,
                restitution: 0.1
            });

            enemyEntity.rigidbody.syncEntityToBody();
            startEnemyBehavior(enemyEntity, type);
            enemies.push(enemyEntity);
        };


        const startEnemyBehavior = (enemyEntity, type) => {

            const enemySpeed = 8.5;
            let movingForward = true;
            enemyEntity.animation?.play(assets.charRun2AnimationAsset.name);
            const toggleDirection = () => {
                movingForward = !movingForward;
            };

            if (type === 2 || type === 3 || type === 4 || type === 5 ) {
                const randomToggleTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
                setInterval(toggleDirection, randomToggleTime);
            }
            const dropBomb = () => {
                const enemyBomb = new pc.Entity("EnemyBomb");
                enemyBomb.addComponent("model", {
                    type: "asset",
                    asset: assets.enemyBombModelAsset
                });
                enemyBomb.setLocalScale(125, 125, 125);
                enemyBomb.setPosition(enemyEntity.getPosition().x, 1, enemyEntity.getPosition().z);
                app.root.addChild(enemyBomb);

                const waitForUnpauseThenBombExplode = () => {
                    if (!isPause) {
                        console.log("Enemy Bomb exploded at", enemyBomb.getPosition());
                
                        const enemyBombArea = new pc.Entity("EnemyBombArea");
                        enemyBombArea.addComponent("model", {
                            type: "asset",
                            asset: assets.explosionEnemyBombModelAsset
                        });
                        enemyBombArea.setLocalScale(8, 8, 8);
                        enemyBombArea.setPosition(enemyBomb.getPosition().x, -0.5, enemyBomb.getPosition().z);
                
                        app.root.addChild(enemyBombArea);
                
                        let scaleDuration = 200;
                        let scaleSteps = 15;
                        let scaleStepTime = scaleDuration / scaleSteps;
                        let currentScale = 1.5;
                        let targetScale = 2;
                
                        const animateScale = () => {
                            if (currentScale < targetScale) {
                                currentScale += (targetScale - 1.5) / scaleSteps; 
                                enemyBombArea.setLocalScale(currentScale, currentScale, currentScale);
                                setTimeout(animateScale, scaleStepTime);
                            }
                        };
                
                        animateScale(); 
                
                        setTimeout(() => {
                            enemyBombArea.destroy();
                        }, 200); 
                
                        checkEnemyForDestruction(obstacles, enemyBomb.getPosition(), 10); 
                        checkDestroyCharacter(characters, enemyBomb.getPosition(), 6);
                        enemyBomb.destroy();
                    } else {
                        setTimeout(waitForUnpauseThenBombExplode, 100);
                    }
                };
                
                setTimeout(waitForUnpauseThenBombExplode, 1000);
            };

            const dropBombWithAnimation = () => {
                if (isPause) return;
                enemyEntity.animation?.play(assets.charAttackAnimationAsset.name);
                dropBomb();
                
                setTimeout(() => {
                    enemyEntity.animation?.play(assets.charRun2AnimationAsset.name);
                }, 400);
            }
            
            enemyEntity.enemyBombInterval = setInterval(function() {
                dropBombWithAnimation();
                clearInterval(enemyEntity.enemyBombInterval);
                let randomTime = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
                enemyEntity.enemyBombInterval = setInterval(arguments.callee, randomTime);
            }, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);

            app.on("update", (dt) => {
                if (isPause) return;
                if (enemyEntity) {
                    checkForEnemy(items, enemies, 4);
                    const playerPos = characterEntity.getPosition();
                    const enemyPos = enemyEntity.getPosition();
                    const direction = playerPos.clone().sub(enemyPos).normalize();

                    const velocity = new pc.Vec3(direction.x * enemySpeed, 0, direction.z * enemySpeed);
                    const targetPosition = new pc.Vec3(enemyPos.x + velocity.x * dt, enemyPos.y, enemyPos.z + velocity.z * dt);
                    let canMove = true;

                    obstacles.forEach(obstacle => {
                        if (obstacle.enabled) { 
                            const obstaclePosition = obstacle.getPosition();
                            const distance = targetPosition.distance(obstaclePosition);

                            if (distance < 4) {
                                canMove = false; 
                            }
                        }
                    });

                    const angle = Math.atan2(direction.x, direction.z) * pc.math.RAD_TO_DEG;

                    if (canMove && type == 1) {
                        enemyEntity.setPosition(enemyPos.x + velocity.x * dt, enemyPos.y, enemyPos.z + velocity.z * dt);
                        enemyEntity.setEulerAngles(0, angle, 0);
                    } else if (canMove && type === 2) {
                        const moveDirection = movingForward ? -1 : 1;
                        enemyEntity.setPosition(enemyPos.x, enemyPos.y, enemyPos.z + moveDirection * enemySpeed * dt);
                        enemyEntity.setEulerAngles(0, movingForward ? 180 : 0, 0); 
                    } else if (canMove && type === 3) {
                        const moveDirection = movingForward ? 1 : -1;
                        enemyEntity.setPosition(enemyPos.x + moveDirection * enemySpeed * dt, enemyPos.y, enemyPos.z);
                        enemyEntity.setEulerAngles(0, movingForward ? 90 : -90, 0); 
                    } else if (canMove && type === 4) {
                        const moveDirection = movingForward ? 1 : -1;
                        enemyEntity.setPosition(
                            enemyPos.x + moveDirection * (enemySpeed * Math.cos(Math.PI / 4)) * dt,
                            enemyPos.y,
                            enemyPos.z + moveDirection * (enemySpeed * Math.sin(Math.PI / 4)) * dt
                        );
                        enemyEntity.setEulerAngles(0, movingForward ? 45 : 225, 0);
                    }
                    const pos = enemyEntity.getPosition();
                    pos.x = pc.math.clamp(pos.x, -boundaryX, boundaryX);
                    pos.z = pc.math.clamp(pos.z, -boundaryZ, boundaryZ);
                    enemyEntity.setPosition(pos);
                }
            });
        };
        
        // -------------------------------- END OF ENEMY GENERATION -------------------------------------//

        const spawnMultipleEnemies = (enemyNumber, type, texture) => {
            for (let i = 0; i < enemyNumber; i++) {
                createEnemy(type, texture);
            }
            
        };

        if(currentScene == 'scene1' ){
            spawnMultipleEnemies(6, 2, 1);
            spawnMultipleEnemies(6, 3, 3);
        } else if(currentScene == 'scene2' ){
            spawnMultipleEnemies(5, 2, 1);
            spawnMultipleEnemies(5, 3, 3);
        } else if(currentScene == 'scene3' ){
            spawnMultipleEnemies(7, 2, 1);
            spawnMultipleEnemies(7, 3, 3);
        }

        // -------------------------------- BOSS GENERATION -------------------------------------//
        const createBoss = () => {
            const bossEntity = new pc.Entity("Boss");
            let bossModel;
            if (currentScene == "scene1") {
                bossModel = assets.boss1ModelAsset
            } else if (currentScene == "scene2") {
                bossModel = assets.boss2ModelAsset
            } else if (currentScene == "scene3") {
                bossModel = assets.boss3ModelAsset
            }
            bossEntity.addComponent("model", {
                type: "asset",
                asset: bossModel 
            });
               
            bossEntity.setLocalScale(8, 8, 8);
            bossEntity.setPosition(Math.random() * 200 - 100, 1, Math.random() * 100 - 50); 
            app.root.addChild(bossEntity);
            bossEntity.addComponent("animation", {
                assets: [assets.charRun2AnimationAsset, assets.charAttackAnimationAsset],
            });
            
        
            bossEntity.addComponent("collision", {
                type: "capsule",
                radius: 4,
                height: 8
            });
        
            bossEntity.addComponent("rigidbody", {
                type: "dynamic",
                mass: 1,
            });
        
            bossEntity.rigidbody.syncEntityToBody();
            startBossBehavior(bossEntity);
            bosses.push(bossEntity);
        };
        
        
        const startBossBehavior = (bossEntity) => {
            const bossSpeed = 5;
            bossEntity.animation?.play(assets.charRun2AnimationAsset.name);
        
            const dropBomb = () => {
                createRandomPoision(200, 100, 5, 50);
                const bossBomb = new pc.Entity("BossBomb");
                let chosenBombModel;
                if (currentScene == "scene1") {
                    chosenBombModel = assets.boss1BombModelAsset
                } else if (currentScene == "scene2") {
                    chosenBombModel = assets.boss2BombModelAsset
                } else if (currentScene == "scene3") {
                    chosenBombModel = assets.boss3BombModelAsset
                }
                bossBomb.addComponent("model", {
                    type: "asset",
                    asset: chosenBombModel
                });
                if (currentScene == "scene1") {
                    bossBomb.setLocalScale(0.1, 0.1, 0.1);
                    bossBomb.setPosition(bossEntity.getPosition().x, 2, bossEntity.getPosition().z);
                } else if (currentScene == "scene2") {
                    bossBomb.setLocalScale(0.25, 0.25, 0.25);
                    bossBomb.setPosition(bossEntity.getPosition().x, 0, bossEntity.getPosition().z);
                } else if (currentScene == "scene3") {
                    bossBomb.setLocalScale(10, 10, 10);
                    bossBomb.setPosition(bossEntity.getPosition().x, 2.5, bossEntity.getPosition().z);
                } 
                app.root.addChild(bossBomb);
        
                const waitForUnpauseThenBossBombExplode = () => {
                    if (!isPause) {
                        console.log("Boss Bomb exploded at", bossBomb.getPosition());
                
                        const bossBombArea = new pc.Entity("BossBombArea");
                        bossBombArea.addComponent("model", {
                            type: "asset",
                            asset: assets.explosionBombModelAsset
                        });
                        bossBombArea.setLocalScale(80, 80, 80);
                        bossBombArea.setPosition(bossBomb.getPosition().x, 0, bossBomb.getPosition().z);
                        app.root.addChild(bossBombArea);
                
                        let scaleDuration = 200;
                        let scaleSteps = 15;
                        let scaleStepTime = scaleDuration / scaleSteps;
                        let currentScale = 1.5;
                        let targetScale = 2;
                
                        const animateScale = () => {
                            if (currentScale < targetScale) {
                                currentScale += (targetScale - 1.5) / scaleSteps; 
                                bossBombArea.setLocalScale(currentScale, currentScale, currentScale);
                                setTimeout(animateScale, scaleStepTime);
                            }
                        };
                
                        animateScale();
                
                        setTimeout(() => {
                            bossBombArea.destroy();
                        }, 500);
                
                        checkEnemyForDestruction(obstacles, bossBomb.getPosition(), 15);
                        checkDestroyCharacter(characters, bossBomb.getPosition(), 20);
                        bossBomb.destroy();
                    } else {
                        setTimeout(waitForUnpauseThenBossBombExplode, 100); 
                    }
                };
                
                setTimeout(waitForUnpauseThenBossBombExplode, 2000);
            };
        
            const dropBombWithAnimation = () => {
                if (isPause) return;
                bossEntity.animation?.play(assets.charAttackAnimationAsset.name);
                dropBomb();
                
                setTimeout(() => {
                    bossEntity.animation?.play(assets.charRun2AnimationAsset.name);
                }, 1500);
            }
            
            bossEntity.enemyBombInterval = setInterval(function() {
                dropBombWithAnimation();
                clearInterval(bossEntity.enemyBombInterval);
                let randomTime = Math.floor(Math.random() * (6000 - 4000 + 1)) + 4000;
                bossEntity.enemyBombInterval = setInterval(arguments.callee, randomTime);
            }, Math.floor(Math.random() * (6000 - 4000 + 1)) + 4000);
        
            app.on("update", (dt) => {
                if (isPause) return;
                if (bossEntity) {
                    checkForBoss(items, bosses, 8);
                    const playerPos = characterEntity.getPosition();
                    const enemyPos = bossEntity.getPosition();
                    const direction = playerPos.clone().sub(enemyPos).normalize();
        
                    const velocity = new pc.Vec3(direction.x * bossSpeed, 0, direction.z * bossSpeed);
                    const targetPosition = new pc.Vec3(enemyPos.x + velocity.x * dt, enemyPos.y, enemyPos.z + velocity.z * dt);
                    let canMove = true;
        
                    obstacles.forEach(obstacle => {
                        if (obstacle.enabled) { 
                            const obstaclePosition = obstacle.getPosition();
                            const distance = targetPosition.distance(obstaclePosition);
        
                            if (distance < 4) {
                                canMove = false; 
                            }
                        }
                    });
        
                    const angle = Math.atan2(direction.x, direction.z) * pc.math.RAD_TO_DEG;
        
                    if (canMove) {
                        bossEntity.setPosition(enemyPos.x + velocity.x * dt, enemyPos.y, enemyPos.z + velocity.z * dt);
                        bossEntity.setEulerAngles(0, angle, 0);
                    }
                    const pos = bossEntity.getPosition();
                    pos.x = pc.math.clamp(pos.x, -boundaryX, boundaryX);
                    pos.z = pc.math.clamp(pos.z, -boundaryZ, boundaryZ);
                    bossEntity.setPosition(pos);
                }
            });
        };
        
        const spawnMultipleBosses = (bossNumber) => {
            for (let i = 0; i < bossNumber; i++) {
                createBoss();
                specialTree += 5;
            }
        
        };
        // --------------------------  END OF BOSS GENERATION ------------------------------------//

        // Set flag for spawn strong enemy
        let hasSpawnedStrongEnemies = false;
        let hasSpawnedBoss = false;
 
        app.on("update", () => {
            if (hasSpawnedBoss) {
                displayBoss(bossLive);
            }
            // Check display
            if (currentScene == 'scene1') {
                display(enemyKill, point, bombNumber, live, 22, highScore);
                displaySpecial(specialTree);
            } else if (currentScene == 'scene2') {
                display(enemyKill, point, bombNumber, live, 20, highScore);
                displaySpecial(specialTree);
            } else if (currentScene == 'scene3') {
                display(enemyKill, point, bombNumber, live, 24, highScore);
                displaySpecial(specialTree);
            }
            if (enemyKill == 8 && !hasSpawnedStrongEnemies || enemyKill == 20 && !hasSpawnedStrongEnemies) {
                hasSpawnedStrongEnemies = true;
                spawnMultipleEnemies(1, 1, 2);
                spawnMultipleEnemies(5, 4, 4);
                spawnMultipleEnemies(3, 2, 1);
                spawnMultipleEnemies(3, 3, 3);
            } else if (enemyKill != 8 && enemyKill != 20 ) {
                hasSpawnedStrongEnemies = false;
            }

            if (specialTree == 0) {
                clearInstruction("displaySpecial");
            }
            // Check bomb alert
            if ( bombNumber <= 2) {
                bombAlert()
            } else if ( bombNumber > 2) {
                clearInstruction("bombAlert");
            }
            //Check spawn boss
            if (currentScene == 'scene1' && enemyKill >= 22 && !hasSpawnedBoss) {
                hasSpawnedBoss = true;
                spawnMultipleBosses(1);
                bossInstruction();
            } else if (currentScene == 'scene2' && enemyKill >= 20 && !hasSpawnedBoss) {
                hasSpawnedBoss = true;
                spawnMultipleBosses(1);
                bossInstruction();
            } else if (currentScene == 'scene3' && enemyKill >= 24 && !hasSpawnedBoss) {
                hasSpawnedBoss = true;
                spawnMultipleBosses(1);
                bossInstruction();
            }
        });
        
        addPauseButton();
        moveInstructionD();
        moveInstructionA();
        moveInstructionS();
        moveInstructionW();
        bombInstruction();
        obstaclesInstruction();
        enemyInstruction();

        const createRandomObstacles = (a, b, numObstacles, minDistance, t) => {
            for (let i = 0; i < numObstacles; i++) {
                let x, z;
                let attempts = 0;
                do {
                    x = Math.random() * a - 100;
                    z = Math.random() * b - 50;
                    attempts++;
                    if (attempts > 100) break; 
                } while (obstacles.some(obstacle => obstacle.getPosition().distance(new pc.Vec3(x, 0, z)) < minDistance));

                createObstacle(x, z, t, obstacles);
            }
            
        };

        const createRandomPoision = (a, b, numPoision, minDistance) => {
            for (let i = 0; i < numPoision; i++) {
                let x, z;
                let attempts = 0;
                do {
                    x = Math.random() * a - 100;
                    z = Math.random() * b - 50;
                    attempts++;
                    if (attempts > 100) break; 
                } while (items.some(item => item.getPosition().distance(new pc.Vec3(x, 0, z)) < minDistance));

                createItem(x, z, 8, items);
            }
            
        };


        //Create random poision item
        createRandomPoision(200, 100, 20, 50);

        //Create random cloud
        createRandomObstacles(200, 100, 15, 60, 7);

        //Create map base on stage
        if (currentScene == 'scene1') {
        createRandomObstacles(200, 100, 20, 30, 19);
        createRandomObstacles(200, 100, 20, 30, 10);
        createRandomObstacles(200, 100, 15, 30, 14);
        createRandomObstacles(200, 100, 20, 30, 15);
        createRandomObstacles(200, 100, 15, 30, 16);
        createRandomObstacles(200, 100, 15, 30, 17);
        createRandomObstacles(200, 100, 30, 30, 9);
        createRandomObstacles(200, 100, 30, 30, 8);
        createRandomObstacles(200, 100, 30, 30, 3);
        createRandomObstacles(200, 100, 10, 30, 11);
        createRandomObstacles(200, 100, 10, 30, 5);
        createRandomObstacles(200, 100, 15, 60, 8);

        } else if (currentScene == 'scene2') {
        createRandomObstacles(200, 100, 20, 50, 1);
        createRandomObstacles(200, 100, 20, 50, 20);
        createRandomObstacles(200, 100, 20, 50, 18);
        createRandomObstacles(200, 100, 20, 40, 2);
        createRandomObstacles(200, 100, 20, 40, 21);
        createRandomObstacles(200, 100, 20, 30, 3);
        createRandomObstacles(200, 100, 20, 40, 6);
        createRandomObstacles(200, 100, 10, 50, 4);
        createRandomObstacles(200, 100, 10, 50, 13);
        createRandomObstacles(200, 100, 10, 50, 12);
        } else if (currentScene == 'scene3') {
        createRandomObstacles(200, 100, 20, 50, 22);
        createRandomObstacles(200, 100, 20, 50, 20);
        createRandomObstacles(200, 100, 20, 50, 23);
        createRandomObstacles(200, 100, 20, 40, 24);
        createRandomObstacles(200, 100, 20, 40, 25);
        createRandomObstacles(200, 100, 19, 30, 26);
        createRandomObstacles(200, 100, 20, 40, 27);
        createRandomObstacles(200, 100, 10, 50, 6);
        createRandomObstacles(200, 100, 10, 50, 21);
        createRandomObstacles(200, 100, 10, 50, 28);
        createRandomObstacles(200, 100, 20, 50, 29);
        createRandomObstacles(200, 100, 10, 50, 30);
        }

        // Load the selected scene
        loadScene(currentScene, assets);
    });
}

