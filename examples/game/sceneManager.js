
function loadScene(sceneName, assets) {
    if (sceneName === 'scene1') {
        setupScene1(assets);
    } else if (sceneName === 'scene2') {
        setupScene2(assets);
    } else if (sceneName === 'scene3') {
        setupScene3(assets);
    }
}

function setupScene1(assets) {
    console.log("Scene 1 loaded");
    const planeEntity = app.root.findByName("Plane");
    if (planeEntity) {
        const mat = new pc.StandardMaterial();
        mat.diffuseMap = assets.dirtTextureAsset.resource;
        mat.update();
        planeEntity.model.meshInstances.forEach(meshInstance => {
            meshInstance.material = mat;
        });
    }
}

function setupScene2(assets) {
    console.log("Scene 2 loaded");
    const planeEntity = app.root.findByName("Plane");
    if (planeEntity) {
        const mat = new pc.StandardMaterial();
        mat.diffuseMap = assets.planeTextureAsset.resource; 
        mat.update();
        planeEntity.model.meshInstances.forEach(meshInstance => {
            meshInstance.material = mat;
        });
    }
}

function setupScene3(assets) {
    console.log("Scene 3 loaded");
    const planeEntity = app.root.findByName("Plane");
    if (planeEntity) {
        const mat = new pc.StandardMaterial();
        mat.diffuseMap = assets.winterTextureAsset.resource; 
        mat.update();
        planeEntity.model.meshInstances.forEach(meshInstance => {
            meshInstance.material = mat;
        });
    }
}





