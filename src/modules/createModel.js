import { SkeletonViewer } from '@babylonjs/core/Debug';
import * as BABYLON from '@babylonjs/core';

function createModel(url, fileName, scene){
    BABYLON.SceneLoader.ImportMesh('', url, fileName, scene, (newMeshes, particleSystems, skeletons) => {
        console.log(newMeshes, skeletons);
  
        let characterMesh = newMeshes[1];
        let characterBones = skeletons[0];
  
        characterMesh.position = new BABYLON.Vector3(0, 0, 0);
  
        const viewer = new SkeletonViewer(characterBones, characterMesh, scene, false, 3, {
            displayMode: SkeletonViewer.DISPLAY_SPHERE_AND_SPURS
        });
        viewer.isEnabled = true;
        
        characterBones.bones.forEach((bone) => {
            bone.linkTransformNode(null);
        });

        let t = 0;
		
		scene.beforeRender = function () {

			t += .1;

			characterBones.bones[0].setAbsolutePosition(new BABYLON.Vector3(.12*Math.cos(t), 6.5, .12*Math.sin(t)), characterMesh);
		}
    
        // scene.registerBeforeRender(() => {
        //     characterBones.bones.forEach((bone) => {
        //         bone.translate(new BABYLON.Vector3(0, 0, 0.007), BABYLON.Space.WORLD);
        //     });
        // });
    });
}

export default createModel;