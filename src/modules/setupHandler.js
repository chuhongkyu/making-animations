import { getBPM, getModel } from "../utils/store";
import createModel from "./createModel";
import uploadModel from "./uploadModel";
import uploadSound from "./uploadSound";

function setupModelUpload(scene) {
    document.getElementById('upload-model-button').addEventListener('click', async () => {
        const fileInput = document.getElementById('model-file-input');
        const file = fileInput.files[0];
        if (file) {
            await uploadModel(file, scene);
        }
    });
}

function setupSoundUpload(scene) {
    document.getElementById('upload-sound-button').addEventListener('click', async () => {
        const fileInput = document.getElementById('sound-file-input');
        const file = fileInput.files[0];
        if (file) {
            await uploadSound(file);
            createModel(scene)
            updateAudioControls()
        }
   });
}

function updateAudioControls() {
    const audioControls = document.querySelector('.audio-controls');
    const bpmText = audioControls.querySelector('.bpm-text');
    bpmText.innerHTML = '';
    const { fileName } = getModel();
    const bpm = getBPM();

    if (fileName && bpm > 0) {
        bpmText.innerHTML = bpm + '';
        audioControls.classList.add('active');
    } else {
        audioControls.classList.remove('active');
    }
}

export { setupModelUpload, setupSoundUpload };