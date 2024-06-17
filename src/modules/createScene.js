import * as BABYLON from '@babylonjs/core';

function createScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);
    const target = new BABYLON.Vector3(0,2,0)
    const camera = new BABYLON.ArcRotateCamera(
        'MainCamera', 
        1,
        1,
        13, 
        target,
        scene
    );

    camera.attachControl(canvas, true);

    // scene.createDefaultCameraOrLight(true, true, true);
    scene.createDefaultEnvironment();
  
    // var helperCamera = scene.cameras[scene.cameras.length - 1];
    // var helperLight = scene.lights[scene.lights.length - 1];
  
    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene);
  
    return scene;
}

export default createScene;