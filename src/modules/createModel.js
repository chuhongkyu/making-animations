import { SkeletonViewer } from '@babylonjs/core/Debug';
import * as BABYLON from '@babylonjs/core';
import { getBPM, getDuration, getIsPlaying, getModel } from '../utils/store';
import { getRandomRotations } from './makePose';

let currentMeshes = [];
let currentSkeletons = [];

function clearPreviousModel() {
    currentMeshes.forEach(mesh => {
        mesh.dispose();
    });
    currentSkeletons.forEach(skeleton => {
        skeleton.dispose();
    });

    currentMeshes = [];
    currentSkeletons = [];
}

function createModel(scene) {
    const { url, fileName } = getModel();
    if(!url || !fileName) return;

    clearPreviousModel();
    
    BABYLON.SceneLoader.ImportMesh('', url, fileName, scene, (newMeshes, particleSystems, skeletons) => {
        // console.log(newMeshes, skeletons);

        currentMeshes = newMeshes;
        currentSkeletons = skeletons;

        let characterMesh = currentMeshes[1];
        let characterBones = currentSkeletons[0];

        characterMesh.position = new BABYLON.Vector3(0, 0, 0);
        
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, scene.lights[1]);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurKernel = 32;

        characterMesh.receiveShadows = true;
        shadowGenerator.addShadowCaster(characterMesh);

        // const viewer = new SkeletonViewer(characterBones, characterMesh, scene, false, 3, {
        //     displayMode: SkeletonViewer.DISPLAY_SPHERE_AND_SPURS
        // });
        // viewer.isEnabled = true;

        const baseRotations = characterBones.bones.map(bone => {
            return {
                name: bone.name,
                rotationX: bone.rotationQuaternion.toEulerAngles().x,
                rotationY: bone.rotationQuaternion.toEulerAngles().y,
                rotationZ: bone.rotationQuaternion.toEulerAngles().z
            };
        });

        characterBones.bones.forEach((bone) => {
            // skeletonsViewr.innerHTML += `<div class="bone">${bone.name}</div>`;
            bone.linkTransformNode(null);
        });


        let bpm = getBPM();
        if(bpm === 0 || !bpm) return
        let duration = getDuration();

        const rotations = getRandomRotations(bpm, duration, baseRotations);

        const frameRate = Math.floor(rotations.length / duration);
        const beatInterval = (60 / bpm) * frameRate;

        characterBones.bones.forEach((bone, boneIndex) => {
            const animation = new BABYLON.Animation("boneAnimation", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
            const keyFrames = [];

            for (let i = 0; i < rotations.length; i++) {
                const rotation = rotations[i][boneIndex];
                const quaternion = BABYLON.Quaternion.FromEulerAngles(rotation.rotationX, rotation.rotationY, rotation.rotationZ);
                keyFrames.push({
                    frame: i * beatInterval,
                    value: quaternion
                });
            }

            animation.setKeys(keyFrames);

            console.log(`Generated keyframes for bone ${bone.name}:`, keyFrames);

            bone.animations = [];
            bone.animations.push(animation);

            const animatable = scene.beginAnimation(bone, 0, keyFrames[keyFrames.length - 1].frame, true);
            animatable.pause();

            bone.animatable = animatable;
        });

        scene.onBeforeRenderObservable.add(() => {
            if (getIsPlaying()) {
                characterBones.bones.forEach(bone => {
                    const animatable = bone.animatable;
                    if (animatable) animatable.restart();
                });
            } else {
                characterBones.bones.forEach(bone => {
                    const animatable = bone.animatable;
                    if (animatable) animatable.pause();
                });
            }
        });
    });
}

export default createModel;
