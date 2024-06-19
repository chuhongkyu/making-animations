import { SkeletonViewer } from '@babylonjs/core/Debug';
import * as BABYLON from '@babylonjs/core';
import { getBPM, getDuration, getIsPlaying, getModel } from '../utils/store';
import { getRandomRotations } from './makePose';
import { changePose, logBonePoses } from './changePose';
import visualEffect from './visualEffect';

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

function setupSampleButtons(scene, characterBones) {
    
    const idleButton = document.getElementById('idle');
    const danceButton = document.getElementById('dance');

    idleButton.classList.remove('active');
    danceButton.classList.remove('active');

    idleButton.addEventListener('click', async () => {
        idleButton.classList.add('active');
        danceButton.classList.remove('active');
        await changePoseAndSetupAnimation(characterBones, 1, scene);
    });

    danceButton.addEventListener('click', async () => {
        idleButton.classList.remove('active');
        danceButton.classList.add('active');
        await changePoseAndSetupAnimation(characterBones, 2, scene);
    });
}

async function changePoseAndSetupAnimation(characterBones, poseNumber, scene) {
    await changePose(characterBones, poseNumber);
    const baseRotations = characterBones.bones.map(bone => ({
        name: bone.name,
        rotationX: bone.rotationQuaternion.toEulerAngles().x,
        rotationY: bone.rotationQuaternion.toEulerAngles().y,
        rotationZ: bone.rotationQuaternion.toEulerAngles().z
    }));
    setupAnimation(scene, characterBones, baseRotations);
}

function setupAnimation(scene, characterBones, baseRotations, shadowGenerator) {
    let bpm = getBPM();
    if (bpm === 0 || !bpm) return;
    let duration = getDuration();

    const rotations = getRandomRotations(bpm, duration, baseRotations);

    const frameRate = bpm;
    const totalFrames = duration * frameRate;

    characterBones.bones.forEach((bone, boneIndex) => {
        const animation = new BABYLON.Animation("boneAnimation", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames = [];

        for (let i = 0; i < rotations.length; i++) {
            const rotation = rotations[i][boneIndex];
            const quaternion = BABYLON.Quaternion.FromEulerAngles(rotation.rotationX, rotation.rotationY, rotation.rotationZ);
            keyFrames.push({
                frame: (i * totalFrames) / rotations.length,
                value: quaternion
            });
        }

        animation.setKeys(keyFrames);

        bone.animations = [];
        bone.animations.push(animation);

        const characterAnimatable = scene.beginAnimation(bone, 0, totalFrames, true);
        characterAnimatable.pause();

        bone.animatable = characterAnimatable;
    });

    const { boxAnimatable1, boxAnimatable2 } = visualEffect(frameRate, totalFrames, scene, shadowGenerator)

    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.ontimeupdate = () => {
        const currentTime = audioPlayer.currentTime;
        characterBones.bones.forEach((bone) => {
            const characterAnimatable = bone.animatable;
            if (characterAnimatable) {
                characterAnimatable.goToFrame(currentTime * frameRate);
            }
        });
        if (boxAnimatable1) {
            boxAnimatable1.goToFrame(currentTime * frameRate);
        }
        if (boxAnimatable2) {
            boxAnimatable2.goToFrame(currentTime * frameRate);
        }
    };

    scene.onBeforeRenderObservable.add(() => {
        if (getIsPlaying()) {
            characterBones.bones.forEach(bone => {
                const characterAnimatable = bone.animatable;
                if (characterAnimatable) characterAnimatable.restart();
            });
            if (boxAnimatable1) boxAnimatable1.restart();
            if (boxAnimatable2) boxAnimatable2.restart();
            document.querySelector('.tools').classList.add('active');
        } else {
            characterBones.bones.forEach(bone => {
                const characterAnimatable = bone.animatable;
                if (characterAnimatable) characterAnimatable.pause();
            });
            if (boxAnimatable1) boxAnimatable1.pause();
            if (boxAnimatable2) boxAnimatable2.pause();
            document.querySelector('.tools').classList.remove('active');
        }
    });
}


function createModel(scene) {
    const { url, fileName } = getModel();
    if (!url || !fileName) return;

    clearPreviousModel();

    const wrapper = document.querySelector(".pose-wrapper");
    wrapper.classList.add("active");

    BABYLON.SceneLoader.ImportMesh('', url, fileName, scene, (newMeshes, particleSystems, skeletons) => {
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

        let baseRotations = characterBones.bones.map(bone => {
            return {
                name: bone.name,
                rotationX: bone.rotationQuaternion.toEulerAngles().x,
                rotationY: bone.rotationQuaternion.toEulerAngles().y,
                rotationZ: bone.rotationQuaternion.toEulerAngles().z
            };
        });

        characterBones.bones.forEach((bone) => {
            bone.linkTransformNode(null);
        });


        // logBonePoses(characterBones)

        setupSampleButtons(scene, characterBones)
        setupAnimation(scene, characterBones, baseRotations, shadowGenerator);
    });
}

export default createModel;
