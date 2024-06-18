import * as BABYLON from '@babylonjs/core';
import { getIsPlaying } from '../utils/store';

function visualEffect(bpm, scene) {
    const box1 = BABYLON.MeshBuilder.CreateBox('box1', { size: 2 }, scene);
    const box2 = BABYLON.MeshBuilder.CreateBox('box2', { size: 2 }, scene);

    box1.position.x = -1.5;
    box1.position.y = 1;
    box1.position.z = -10;

    box2.position.x = 1.5;
    box2.position.y = 1;
    box2.position.z = -10;

    const material1 = new BABYLON.StandardMaterial('boxMat1', scene);
    const material2 = new BABYLON.StandardMaterial('boxMat2', scene);

    material1.diffuseColor = new BABYLON.Color3(1, 0, 1);
    material2.diffuseColor = new BABYLON.Color3(1, 0, 1);

    box1.material = material1;
    box2.material = material2;

}

export default visualEffect;
