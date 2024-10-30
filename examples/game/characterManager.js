
function createBomb(bombs, characterEntity, obstacles, enemies) {
    const explosion = new Audio("../../assets/audio/explosion.mp3");
    const bomb = new pc.Entity("Bomb");
    bomb.addComponent("model", {
        type: "asset",
        asset: assets.bombModelAsset
    });
    bomb.setLocalScale(1, 1, 1);
    bomb.setPosition(characterEntity.getPosition().x, 0, characterEntity.getPosition().z);
    app.root.addChild(bomb);
    bombs.push(bomb);
    bombNumber -= 1;

    setTimeout(() => {
        console.log("Bomb exploded at", bomb.getPosition());

        const bombArea = new pc.Entity("BombArea");
        bombArea.addComponent("model", {
            type: "asset",
            asset: assets.explosionBombModelAsset
        });
        bombArea.setLocalScale(1.5, 1.5, 1.5);
        bombArea.setPosition(bomb.getPosition().x, 0, bomb.getPosition().z);
    
        app.root.addChild(bombArea);
    
        let scaleDuration = 200; 
        let scaleSteps = 25; 
        let scaleStepTime = scaleDuration / scaleSteps; 
        let currentScale = 1;
        let targetScale = 1.5; 
    
        const animateScale = () => {
            if (currentScale < targetScale) {
                currentScale += (targetScale - 1) / scaleSteps; // Increase scale gradually
                bombArea.setLocalScale(currentScale, currentScale, currentScale);
                setTimeout(animateScale, scaleStepTime);
            }
        }
    
        animateScale(); 
    
        setTimeout(() => {
            bombArea.destroy();
        }, 200); 
        explosion.play();
        checkForDestruction(obstacles, bomb.getPosition(), 10);
        checkDestroyEnemy(enemies, bomb.getPosition(), 5); 
        bomb.destroy();
    }, 2000); 
};