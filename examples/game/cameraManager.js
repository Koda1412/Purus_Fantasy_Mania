
function cameraSetup(cameraEntity, scene) {
    cameraEntity.addComponent("camera", {
        clearColor: new pc.Color(0, 0.25, 0)
    });
    cameraEntity.setPosition(0, 60, 60); 
    cameraEntity.lookAt(pc.Vec3.ZERO);
    app.root.addChild(cameraEntity);
    
    let value; 

    if (scene === 'scene1') {
        value = 3.5;
    } else if (scene === 'scene2') {
        value = 4;
    } else if (scene === 'scene3') {
        value = 2;
    }

    // Add directional light with shadows
    const directionalLight = new pc.Entity("DirectionalLight");
    directionalLight.addComponent("light", {
        type: pc.LIGHTTYPE_DIRECTIONAL,
        color: new pc.Color(1, 1, 1),
        intensity: value,
        castShadows: true,
        shadowDistance: 300,
        shadowResolution: 4096,
        shadowBias: 0.2
    });
    directionalLight.setEulerAngles(90, 75, 120);
    app.root.addChild(directionalLight);

    // Add ambient light
    app.scene.ambientLight = new pc.Color(0.5, 0.5, 0.5);
}
