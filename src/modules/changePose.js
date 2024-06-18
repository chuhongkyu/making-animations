import * as BABYLON from '@babylonjs/core';

async function loadSamplePose() {
    const response = await fetch('assets/sample/sample01.json');
    const data = await response.json();
    return data;
}

async function changePose(characterBones, scene) {
    const samplePose = await loadSamplePose();

    samplePose.forEach(pose => {
        const bone = characterBones.bones.find(b => b.name === pose.name);
        
        if (bone) {
            const { x: px, y: py, z: pz } = pose.position;
            const { x: rx, y: ry, z: rz } = pose.rotation;
            
            bone.setPosition(new BABYLON.Vector3(px, py, pz), BABYLON.Space.WORLD);
            bone.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(rx, ry, rz);
        }
    });
}

function extractBonePoses(characterBones) {
    const bonePoses = characterBones.bones.map(bone => {
        const position = bone.getPosition(BABYLON.Space.WORLD);
        const rotation = bone.rotationQuaternion.toEulerAngles();

        return {
            name: bone.name,
            position: {
                x: position.x,
                y: position.y,
                z: position.z
            },
            rotation: {
                x: rotation.x,
                y: rotation.y,
                z: rotation.z
            }
        };
    });

    return bonePoses;
}

function logBonePoses(characterBones) {
    const bonePoses = extractBonePoses(characterBones);
    console.log(JSON.stringify(bonePoses, null, 2));
}

export { extractBonePoses, logBonePoses, changePose};
