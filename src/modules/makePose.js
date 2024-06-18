// 록: 70-95
// 힙합: 80-130
// R&B: 70-110
// 팝: 110-140
// EDM: 120-145
// 테크노: 130-155


export function getRandomRotations(bpm, duration, baseRotations) {
    const totalBeats = Math.floor((bpm / 60) * duration);
    const rotations = [];

    for (let i = 0; i < totalBeats; i++) {
        const frameRotations = baseRotations.map(baseRotation => {
            let randomRotationX, randomRotationY, randomRotationZ;

            if (baseRotation.name === 'mixamorig:Neck') {
                randomRotationX = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationZ;
            } else if(baseRotation.name === 'mixamorig:LeftShoulder' || baseRotation.name === 'mixamorig:RightShoulder'){
                randomRotationX = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 2 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationZ;
            } else if(baseRotation.name === 'mixamorig:RightLeg'){
                randomRotationX = baseRotation.rotationX;
                randomRotationY = Math.floor(Math.random() * 5) * 0.005  + baseRotation.rotationY;
                randomRotationZ = Math.floor(Math.random() * 5) * 0.005  + baseRotation.rotationZ;
            } else if(baseRotation.name === 'mixamorig:LeftLeg'){
                randomRotationX = baseRotation.rotationX;
                randomRotationY = Math.floor(Math.random() * 5) * 0.005  + baseRotation.rotationY;
                randomRotationZ = Math.floor(Math.random() * 5) * 0.005  + baseRotation.rotationZ;
            } else if(
                baseRotation.name === 'mixamorig:LeftUpLeg' ||
                baseRotation.name === 'mixamorig:LeftFoot' ||
                baseRotation.name === 'mixamorig:LeftToeBase'||
                baseRotation.name === 'mixamorig:RightUpLeg'||
                baseRotation.name === 'mixamorig:RightFoot'||
                baseRotation.name === 'mixamorig:RightToeBase'
            ){
                randomRotationX = baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 9 + baseRotation.rotationY;
                randomRotationZ = baseRotation.rotationZ;
            } else if(baseRotation.name === 'mixamorig:LeftHand' || baseRotation.name === 'mixamorig:RightHand'){
                randomRotationX = (Math.random() - 0.5) * Math.PI / 2.5 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 2.5 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 2.5 + baseRotation.rotationZ;
            } else if(baseRotation.name === 'mixamorig:Hips'){
                randomRotationX = baseRotation.rotationX;
                randomRotationY = baseRotation.rotationY;
                randomRotationZ = baseRotation.rotationZ;
            } else {
                randomRotationX = (Math.random() - 0.5) * Math.PI / 5 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 5 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 5 + baseRotation.rotationZ;
            }

            return {
                name: baseRotation.name,
                rotationX: randomRotationX,
                rotationY: randomRotationY,
                rotationZ: randomRotationZ
            };
        });

        rotations.push(frameRotations);
    }

    return rotations;
}

