

function createItem(x, z, t, items) {
    const itemEntity = new pc.Entity("Item");
    let chosenModel;

    const itemMaterial = new pc.StandardMaterial();
    itemEntity.itemType = t;

    switch (t) {
        case 1:
            chosenModel = assets.boostModelAsset;
            itemEntity.setLocalScale(0.035, 0.035, 0.035); 
            itemEntity.setPosition(x, 1.5, z);
            break;
        case 2:
            chosenModel = assets.liveModelAsset;
            itemEntity.setLocalScale(0.009, 0.009, 0.009);  
            itemEntity.setPosition(x, 1.5, z);
            break;
        case 3:
            chosenModel = assets.x5ModelAsset;
            itemEntity.setLocalScale(1, 1, 1);  
            itemEntity.setPosition(x, 1.5, z);
            break;
        case 4:
            chosenModel = assets.pointModelAsset;
            itemEntity.setLocalScale(0.3, 0.3, 0.3);  
            itemEntity.setPosition(x, 1.5, z);
            break;
        case 5:
            chosenModel = assets.mysteryModelAsset;
            itemEntity.setLocalScale(0.8, 0.8, 0.8);  
            itemEntity.setPosition(x, 1.5, z);
            break;
        case 6:
            chosenModel = assets.starModelAsset;
            itemEntity.setLocalScale(1, 1, 1);  
            itemEntity.setPosition(x, 1.5, z);
            break;
        case 7:
            chosenModel = assets.specialTreeModelAsset;
            itemEntity.setLocalScale(0.008, 0.008, 0.008);  
            itemEntity.setPosition(x, 1, z);
            break;
        case 8:
            chosenModel = assets.poisionModelAsset;
            itemEntity.setLocalScale(0.015, 0.015, 0.015);  
            itemEntity.setPosition(x, 0, z);
            break;
        case 9:
            chosenModel = assets.specialTreeModelAsset;
            itemEntity.setLocalScale(0.01, 0.01, 0.01);  
            itemEntity.setPosition(x, 0, z);
            break;
        default: 
            return; 
    }

    itemEntity.addComponent("model", {
        type: "asset",
        asset: chosenModel
    });
    app.root.addChild(itemEntity);
    items.push(itemEntity);
    itemMaterial.update();
    
    itemEntity.addComponent("collision", {
        type: "box", 
        halfExtents: new pc.Vec3(5, 5, 5) 
    });

    itemEntity.addComponent("rigidbody", {
        type: "static", 
        mass: 0
    });

    itemEntity.rigidbody.syncEntityToBody();
}


