

function createObstacle(x, z, t, obstacles) {
    const obstacleEntity = new pc.Entity("Obstacle");
    const obstacleMaterial = new pc.StandardMaterial();
    let chosenModel; 
    switch (t) {
        case 1:
            chosenModel = assets.treeAModelAsset;
            obstacleEntity.setLocalScale(4, 4, 4); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 2:
            chosenModel = assets.treeBModelAsset;
            obstacleEntity.setLocalScale(10, 10, 10);  
            obstacleEntity.setPosition(x, 0, z);
            obstacleMaterial.diffuseMap = assets.obstacleTextureAsset.resource;
            break;
        case 3:
            chosenModel = assets.rockModelAsset;
            obstacleEntity.setLocalScale(4, 4, 4); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 4:
            chosenModel = assets.sunflowerModelAsset;
            obstacleEntity.setLocalScale(0.5, 0.5, 0.5); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 5:
            chosenModel = assets.woodlogModelAsset;
            obstacleEntity.setLocalScale(2, 2, 2); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 6:
            chosenModel = assets.pineModelAsset;
            obstacleEntity.setLocalScale(3, 3, 3); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 7:
            chosenModel = assets.cloudModelAsset;
            obstacleEntity.setLocalScale(10, 10, 10);
            obstacleEntity.setPosition(x, 25, z);
            obstacleMaterial.opacity = 0.4; 
            obstacleMaterial.blendType = pc.BLEND_NORMAL; 
            obstacleMaterial.transparent = true; 
            obstacleMaterial.diffuseMap = assets.obstacleTextureAsset.resource;
            break;
        case 8:
            chosenModel = assets.cornModelAsset;
            obstacleEntity.setLocalScale(4, 4, 4);
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 9:
            chosenModel = assets.cactusflowerModelAsset;
            obstacleEntity.setLocalScale(4, 4, 4);
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 10:
            chosenModel = assets.cactusModelAsset;
            obstacleEntity.setLocalScale(8, 8, 8);
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 11:
            chosenModel = assets.palmModelAsset;
            obstacleEntity.setLocalScale(4, 4, 4); 
            obstacleEntity.setPosition(x, 0, z);
            obstacleMaterial.opacity = 0.8;
            break;
        case 12:
            chosenModel = assets.wheatModelAsset;
            obstacleEntity.setLocalScale(5, 5, 5); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 13:
            chosenModel = assets.treeStumpModelAsset;
            obstacleEntity.setLocalScale(0.2, 0.2, 0.2); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 14:
            chosenModel = assets.cactus2ModelAsset;
            obstacleEntity.setLocalScale(10, 10, 10);
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 15:
            chosenModel = assets.cactus3ModelAsset;
            obstacleEntity.setLocalScale(10, 10, 10);
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 16:
            chosenModel = assets.cactus4ModelAsset;
            obstacleEntity.setLocalScale(10, 10, 10);
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 17:
            chosenModel = assets.cactus5ModelAsset;
            obstacleEntity.setLocalScale(10, 10, 10);
            obstacleEntity.setPosition(x, 0, z);
            break;    
        case 18:
            chosenModel = assets.treeCModelAsset;
            obstacleEntity.setLocalScale(10, 10, 10);
            obstacleEntity.setPosition(x, 0, z);
            obstacleMaterial.diffuseMap = assets.obstacleTextureAsset.resource;
            break;  
        case 19:
            chosenModel = assets.cactus1ModelAsset;
            obstacleEntity.setLocalScale(10, 10, 10);
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 20:
            chosenModel = assets.flowerModelAsset;
            obstacleEntity.setLocalScale(4, 4, 4); 
            obstacleEntity.setPosition(x, 0, z);
        break; 
        case 21:
            chosenModel = assets.cartoonTreeModelAsset;
            obstacleEntity.setLocalScale(2, 2, 2); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 22:
            chosenModel = assets.treeSnowModelAsset;
            obstacleEntity.setLocalScale(5, 5, 5); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 23:
            chosenModel = assets.treeDeathSnowModelAsset;
            obstacleEntity.setLocalScale(6, 6, 6); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 24:
            chosenModel = assets.rockSnowModelAsset;
            obstacleEntity.setLocalScale(2, 2, 2); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 25:
            chosenModel = assets.pineSnowModelAsset;
            obstacleEntity.setLocalScale(5, 5, 5); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 26:
            chosenModel = assets.berriesModelAsset;
            obstacleEntity.setLocalScale(3, 3, 3); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 27:
            chosenModel = assets.bushSnowModelAsset;
            obstacleEntity.setLocalScale(5, 5, 5); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 28:
            chosenModel = assets.willowSnowModelAsset;
            obstacleEntity.setLocalScale(6, 6, 6); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 29:
            chosenModel = assets.commonTreeSnowModelAsset;
            obstacleEntity.setLocalScale(5, 5, 5); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        case 30:
            chosenModel = assets.woodlogSnowModelAsset;
            obstacleEntity.setLocalScale(2, 2, 2); 
            obstacleEntity.setPosition(x, 0, z);
            break;
        
        default: 
            return; 
    }

    obstacleEntity.addComponent("model", {
        type: "asset",
        asset: chosenModel
    });
    app.root.addChild(obstacleEntity);
    obstacles.push(obstacleEntity);

    obstacleMaterial.update();

    if (t != 1 && t != 3 && t != 4 && t != 5 && t != 6 && t != 8 && t != 9 &&
        t != 10 && t != 11 && t != 12 && t != 13 && t != 14 && t != 15 && t != 16 && t != 17
        && t!= 19 && t!= 20 && t!= 21 && t!= 22 && t!= 23 && t!= 24 && t!= 25 && t!= 26
        && t!= 27 && t!= 28 && t!= 29 && t!= 30){
    obstacleEntity.model.meshInstances.forEach(meshInstance => {
        meshInstance.material = obstacleMaterial;
    });
    }

    obstacleEntity.addComponent("collision", {
        type: "box", 
        halfExtents: new pc.Vec3(5, 5, 5) 
    });

    obstacleEntity.addComponent("rigidbody", {
        type: "static", 
        mass: 0
    });

    obstacleEntity.rigidbody.syncEntityToBody();
};


