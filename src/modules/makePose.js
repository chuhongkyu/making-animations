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
            } else if(baseRotation.name === 'mixamorig:LeftUpLeg' || baseRotation.name === 'mixamorig:RightUpLeg'){
                randomRotationX = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 3 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 2.5 + baseRotation.rotationZ;
            } else if(baseRotation.name === 'mixamorig:Hips'){
                randomRotationX = baseRotation.rotationX;
                randomRotationY = baseRotation.rotationY;
                randomRotationZ = baseRotation.rotationZ;
            } else {
                randomRotationX = (Math.random() - 0.5) * Math.PI / 3 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 3 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 3 + baseRotation.rotationZ;
            }

            return {
                rotationX: randomRotationX,
                rotationY: randomRotationY,
                rotationZ: randomRotationZ
            };
        });
        rotations.push(frameRotations);
    }

    return rotations;
}