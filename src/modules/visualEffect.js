import * as BABYLON from '@babylonjs/core';

function visualEffect(frameRate, totalFrames, scene, shadowGenerator) {
    const box1 = BABYLON.MeshBuilder.CreateBox('box1', { size: 2 }, scene);
    const box2 = BABYLON.MeshBuilder.CreateBox('box2', { size: 2 }, scene);

    box1.position.x = -5;
    box1.position.y = -5;
    box1.position.z = -10;

    box2.position.x = 5;
    box2.position.y = -5;
    box2.position.z = -10;

    const material1 = new BABYLON.StandardMaterial('boxMat1', scene);
    const material2 = new BABYLON.StandardMaterial('boxMat2', scene);

    material1.diffuseColor = new BABYLON.Color3(1, 0, 1);
    material2.diffuseColor = new BABYLON.Color3(1, 0, 1);

    box1.material = material1;
    box2.material = material2;

    box1.receiveShadows = true;
    box2.receiveShadows = true;
    shadowGenerator.addShadowCaster(box1);
    shadowGenerator.addShadowCaster(box2);

    const positionAnimation = new BABYLON.Animation("positionAnimation", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const scaleAnimation = new BABYLON.Animation("scaleAnimation", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    const keyFramesPosition = [];
    keyFramesPosition.push({ frame: 0, value: -5 });
    keyFramesPosition.push({ frame: 30, value: 1 });

    const keyFramesScale = [];
    keyFramesScale.push({ frame: 0, value: new BABYLON.Vector3(0, 0, 0) });
    keyFramesScale.push({ frame: 30, value: new BABYLON.Vector3(1, 1, 1) });

    positionAnimation.setKeys(keyFramesPosition);
    scaleAnimation.setKeys(keyFramesScale);

    box1.animations = [positionAnimation, scaleAnimation];
    box2.animations = [positionAnimation.clone(), scaleAnimation.clone()];

    scene.beginAnimation(box1, 0, 30, false);
    scene.beginAnimation(box2, 0, 30, false);

    const colorAnimation = new BABYLON.Animation("colorAnimation", "material.diffuseColor", frameRate, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFramesColor = [];
    keyFramesColor.push({ frame: 0, value: new BABYLON.Color3(1, 0, 1) });
    keyFramesColor.push({ frame: totalFrames / 2, value: new BABYLON.Color3(0, 1, 0) });
    keyFramesColor.push({ frame: totalFrames, value: new BABYLON.Color3(1, 0, 1) });

    colorAnimation.setKeys(keyFramesColor);

    box1.animations.push(colorAnimation);
    box2.animations.push(colorAnimation.clone());

    const boxAnimatable1 = scene.beginAnimation(box1, 0, totalFrames, true);
    const boxAnimatable2 = scene.beginAnimation(box2, 0, totalFrames, true);

    return { boxAnimatable1, boxAnimatable2 }
}

export default visualEffect;