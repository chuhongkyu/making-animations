import * as BABYLON from '@babylonjs/core';
import "@babylonjs/core/Debug/debugLayer";
import '@babylonjs/loaders';
import "@babylonjs/inspector";
import './styles.css';
import createScene from './modules/createScene';
import { setupModelUpload, setupSoundUpload } from './modules/setupHandler';
import { handleUI } from './modules/handleUI';
import { getCanvasCapture } from './utils/store';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('view-canvas');
  const engine = new BABYLON.Engine(canvas, true);

  const scene = createScene(engine, canvas);

  // scene.debugLayer.show({
  //   embedMode:true
  // });

  handleUI();
  setupModelUpload(scene);
  setupSoundUpload(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });

  function loop() {
    requestAnimationFrame(loop);
    const canvasCapture = getCanvasCapture();
    if (canvasCapture && canvasCapture.isRecording()) canvasCapture.recordFrame();
  }
  
  loop();
 

  window.addEventListener('resize', () => {
    engine.resize();
  });
});