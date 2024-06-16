import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import './styles.css';
import { analyze, guess } from 'web-audio-beat-detector';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('view-canvas');
  const engine = new BABYLON.Engine(canvas, true);

  const scene = createScene(engine, canvas);

  setupModelUpload(scene);
  setupSoundUpload();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });
});

function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    'MainCamera', 
    Math.PI / 2,
    Math.PI / 2, 
    2, 
    new BABYLON.Vector3(0, 0, 5), 
    scene
  );
  camera.attachControl(canvas, true);

  const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
  const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene);

  return scene;
}

async function uploadModel(file, scene) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const url = data.url;
    const fileName = data.fileName;
    BABYLON.SceneLoader.ImportMesh('', url, fileName, scene, () => {
      console.log("Model loaded");
    });
  } catch (error) {
    console.error("Error converting file:", error);
  }
}

async function uploadSound (file) {
  if (file && (file.type === 'audio/mp3' || file.type === 'audio/wav')) {
    const audioPlayer = document.getElementById('audio-player');
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.load();

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const { bpm, offset, tempo } = await guess(audioBuffer);

      console.log(`BPM: ${bpm}, Offset: ${offset}, Tempo: ${tempo}`);
    } catch (error) {
      console.error("Error detecting BPM:", error);
    }
  } else {
    alert('Check File MP3 or WAV file.');
  }
}

function setupModelUpload(scene) {
  document.getElementById('upload-model-button').addEventListener('click', async () => {
    const fileInput = document.getElementById('model-file-input');
    const file = fileInput.files[0];
    if (file) {
      await uploadModel(file, scene);
    }
  });
}

function setupSoundUpload() {
  document.getElementById('upload-sound-button').addEventListener('click', async () => {
    const fileInput = document.getElementById('sound-file-input');
    const file = fileInput.files[0];
    if (file) {
      await uploadSound(file);
    }
  });
}