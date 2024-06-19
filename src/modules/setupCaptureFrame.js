import { getScene, getEngine, setIsRecording } from "../utils/store";
import * as BABYLON from '@babylonjs/core';

async function captureFrame() {
  const engine = getEngine();
  const camera = getScene().activeCamera;
  const size = { width: 500, height: 500 };
  const mimeType = "image/jpeg";
  const quality = 1;

  return new Promise((resolve, reject) => {
    if (!engine || !camera) {
      reject(new Error('Engine or camera is not initialized.'));
      return;
    }

    BABYLON.Tools.CreateScreenshot(engine, camera, size, (dataURL) => {
      resolve(dataURL);
    }, mimeType, false, quality);
  });
}

async function sendFrameToServer(frameData) {
  const blob = await (await fetch(frameData)).blob();
  const formData = new FormData();
  formData.append('frame', blob, 'frame.jpg');

  const response = await fetch('http://localhost:3000/upload-frame', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    console.error('Failed to upload frame');
  }
}

let captureInterval;

function startCapturing(recordBtn) {
  captureInterval = setInterval(async () => {
    const frameData = await captureFrame();
    await sendFrameToServer(frameData);
  }, 100); // (10 FPS)

  setIsRecording(true);
  recordBtn.classList.add('on-air');
  recordBtn.classList.remove('stop');
}

function stopCapturing(recordBtn) {
  clearInterval(captureInterval);
  setIsRecording(false);
  recordBtn.classList.remove('on-air');
  recordBtn.classList.add('stop');
}


export {captureFrame, sendFrameToServer, startCapturing, stopCapturing}