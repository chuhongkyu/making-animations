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
            const randomRotationX = (Math.random() - 0.5) * Math.PI / 2 + baseRotation.rotationX;
            const randomRotationY = (Math.random() - 0.5) * Math.PI / 2 + baseRotation.rotationY;
            const randomRotationZ = (Math.random() - 0.5) * Math.PI / 2 + baseRotation.rotationZ;
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

