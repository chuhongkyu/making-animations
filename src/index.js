import * as BABYLON from '@babylonjs/core';
import "@babylonjs/core/Debug/debugLayer";
import '@babylonjs/loaders';
import "@babylonjs/inspector";
import './styles.css';
import createScene from './modules/createScene';
import { setupModelUpload, setupSoundUpload } from './modules/setupHandler';
import { handleUI } from './modules/handleUI';
import { getIsRecording } from './utils/store';
import { captureCanvas, initCapture, startCapture, stopCapture } from './modules/setupCapture';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('view-canvas');
  const engine = new BABYLON.Engine(canvas, true);

  const scene = createScene(engine, canvas);

  scene.debugLayer.show({
    embedMode:true
  });

  handleUI();
  setupModelUpload(scene);
  setupSoundUpload(scene);

  initCapture(canvas)

  engine.runRenderLoop(() => {
    scene.render();
    // if (getIsRecording() === true) {
      captureCanvas(canvas)
    // }
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });
});