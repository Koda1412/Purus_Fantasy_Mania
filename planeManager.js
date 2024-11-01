
function createPlane() {
    const planeEntity = new pc.Entity("Plane");
    planeEntity.addComponent("model", { type: "plane" });
    planeEntity.setLocalScale(225, 1, 125); 
    app.root.addChild(planeEntity);

    const matPlane = new pc.StandardMaterial();
    matPlane.diffuseMap = assets.planeTextureAsset.resource;
    matPlane.cull = pc.CULLFACE_NONE; 
    matPlane.useMetalness = false;
    matPlane.useLighting = true;
    matPlane.update();


    planeEntity.model.meshInstances.forEach(meshInstance => {
        meshInstance.material = matPlane;
    });

    planeEntity.addComponent("collision", {
        type: "box", 
        halfExtents: new pc.Vec3(112.5, 0.5, 62.5) 
    });

    planeEntity.addComponent("rigidbody", {
        type: "static",
        mass: 0,
        friction: 0.5,
        restitution: 0.1
    });
    planeEntity.rigidbody.syncEntityToBody();
}