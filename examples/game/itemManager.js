

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


