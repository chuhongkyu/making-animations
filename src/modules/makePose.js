import { mixamoBoneNames } from "../utils/mixamoBoneNames"
  
function findClosestBoneName(boneName) {
    let closestMatch = mixamoBoneNames[0];
    let closestDistance = levenshtein(boneName, closestMatch);
  
    for (let i = 1; i < mixamoBoneNames.length; i++) {
      const distance = levenshtein(boneName, mixamoBoneNames[i]);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestMatch = mixamoBoneNames[i];
      }
    }
  
    return closestMatch;
}


export function getRandomRotations(bpm, duration, baseRotations) {
    const totalBeats = Math.floor((bpm / 60) * duration);
    const rotations = [];
  
    for (let i = 0; i < totalBeats; i++) {
      const frameRotations = baseRotations.map(baseRotation => {
        let randomRotationX, randomRotationY, randomRotationZ;
  
        const closestBoneName = findClosestBoneName(baseRotation.name);
  
        switch (closestBoneName) {
            case 'mixamorig:Neck':
                randomRotationX = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationZ;
                break;
            case 'mixamorig:LeftShoulder':
            case 'mixamorig:RightShoulder':
                randomRotationX = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 2 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 4 + baseRotation.rotationZ;
                break;
            case 'mixamorig:LeftLeg':
            case 'mixamorig:RightLeg':
                randomRotationX = baseRotation.rotationX;
                randomRotationY = Math.floor(Math.random() * 5) * 0.005 + baseRotation.rotationY;
                randomRotationZ = Math.floor(Math.random() * 5) * 0.005 + baseRotation.rotationZ;
                break;
            case 'mixamorig:LeftUpLeg':
            case 'mixamorig:LeftFoot':
            case 'mixamorig:LeftToeBase':
            case 'mixamorig:RightUpLeg':
            case 'mixamorig:RightFoot':
            case 'mixamorig:RightToeBase':
                randomRotationX = baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 9 + baseRotation.rotationY;
                randomRotationZ = baseRotation.rotationZ;
                break;
            case 'mixamorig:LeftHand':
            case 'mixamorig:RightHand':
                randomRotationX = (Math.random() - 0.5) * Math.PI / 2.5 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 2.5 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 2.5 + baseRotation.rotationZ;
                break;
            case 'mixamorig:Hips':
                randomRotationX = baseRotation.rotationX;
                randomRotationY = baseRotation.rotationY;
                randomRotationZ = baseRotation.rotationZ;
                break;
            default:
                randomRotationX = (Math.random() - 0.5) * Math.PI / 5 + baseRotation.rotationX;
                randomRotationY = (Math.random() - 0.5) * Math.PI / 5 + baseRotation.rotationY;
                randomRotationZ = (Math.random() - 0.5) * Math.PI / 5 + baseRotation.rotationZ;
        }
  
        return {
            name: closestBoneName,
            rotationX: randomRotationX,
            rotationY: randomRotationY,
            rotationZ: randomRotationZ
        };
      });
  
      rotations.push(frameRotations);
    }
  
    return rotations;
}