
// Initialize variables
let app;
// Default game setting
let currentScene = 'scene1';
let enemyKill = 0;
let point = 0;
let bombNumber = 5;
let live = 2;

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

        const speed = 15; 

        let velocity = new pc.Vec3();
        app.on("update", (dt) => {
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

        
        let canCreateBomb = true;
        const bombSound = new Audio("../../assets/audio/drop_bomb.mp3");
        document.body.addEventListener("keydown", (event) => {
            if (event.code === "Space" && canCreateBomb) {
                bombSound.play();
                characterEntity.animation?.play(assets.charAttackAnimationAsset.name);
                setTimeout(() => {
                    characterEntity.animation?.play(assets.charRunAnimationAsset.name);
                }, 400);
                createBomb(bombs, characterEntity, obstacles, enemies); 
                clearInstruction("bombInstruction");
                canCreateBomb = false; 
                setTimeout(() => {
                    canCreateBomb = true; 
                }, 2000)
            }
        });
        

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
                default:
                enemyEntity.addComponent("model", {
                    type: "asset",
                    asset: assets.enemyModelAsset 
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

            if (type === 2 || type === 3) {
                const randomToggleTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
                setInterval(toggleDirection, randomToggleTime);
            }
            const dropBomb = () => {
                const enemyBomb = new pc.Entity("EnemyBomb");
                enemyBomb.addComponent("model", {
                    type: "asset",
                    asset: assets.enemyBombModelAsset
                });
                enemyBomb.setLocalScale(0.04, 0.04, 0.04);
                enemyBomb.setPosition(enemyEntity.getPosition().x, 1, enemyEntity.getPosition().z);
                app.root.addChild(enemyBomb);

                setTimeout(() => {
                    console.log("Enemy Bomb exploded at", enemyBomb.getPosition());

                    // Create a red bomb area
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
                }, 1000);
            };

            const dropBombWithAnimation = () => {
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
                if (enemyEntity) {
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
                    }
                    const pos = enemyEntity.getPosition();
                    pos.x = pc.math.clamp(pos.x, -boundaryX, boundaryX);
                    pos.z = pc.math.clamp(pos.z, -boundaryZ, boundaryZ);
                    enemyEntity.setPosition(pos);
                }
            });
        };
        
        const spawnMultipleEnemies = (enemyNumber, type, texture) => {
            for (let i = 0; i < enemyNumber; i++) {
                createEnemy(type, texture);
            }
            
        };

        if(currentScene == 'scene1' ){
            spawnMultipleEnemies(10, 2, 1);
            spawnMultipleEnemies(12, 3, 3);
        } else if(currentScene == 'scene2' ){
            spawnMultipleEnemies(10, 2, 1);
            spawnMultipleEnemies(10, 3, 3);
        } else if(currentScene == 'scene3' ){
            spawnMultipleEnemies(12, 2, 1);
            spawnMultipleEnemies(12, 3, 3);
        }

        // Set flag for spawn strong enemy
        let hasSpawnedStrongEnemies = false;

        app.on("update", () => {
            display(enemyKill, point, bombNumber, live, currentScene);
            if (enemyKill % 6 === 0 && !hasSpawnedStrongEnemies) {
                spawnMultipleEnemies(1, 1, 2);
                hasSpawnedStrongEnemies = true; 
            } else if (enemyKill % 6 !== 0) {
                
                hasSpawnedStrongEnemies = false;
            }
            // Check winning condition
            if (currentScene == 'scene1' && enemyKill == 22) {
                gameWin(point, enemyKill);
            } else if (currentScene == 'scene2' && enemyKill == 20) {
                gameWin(point, enemyKill);
            } else if (currentScene == 'scene3' && enemyKill == 24) {
                gameWin(point, enemyKill);
            }
            // Check bomb alert
            if ( bombNumber <= 2) {
                bombAlert()
            } else if ( bombNumber > 2) {
                clearInstruction("bombAlert");
            }
        });

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
        createRandomObstacles(200, 100, 15, 60, 7);
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
        createRandomObstacles(200, 100, 10, 60, 7);
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
        createRandomObstacles(200, 100, 10, 60, 7);
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

