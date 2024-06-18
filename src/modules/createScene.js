import * as BABYLON from '@babylonjs/core';

function createScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);
    const target = new BABYLON.Vector3(0,1,0)
    const camera = new BABYLON.ArcRotateCamera(
        'MainCamera', 
        1,
        1.17,
        4, 
        target,
        scene
    );

    camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 12;
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = Math.PI / 2 - 0.1;
    

    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 80, height: 80 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    scene.clearColor = new BABYLON.Color3(1, 1, 1);
  
    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    const light2 = new BABYLON.DirectionalLight('light2', new BABYLON.Vector3(0, -1, -1), scene);
    light2.position = new BABYLON.Vector3(5, 10, 5);

    return scene;
}

export default createScene;