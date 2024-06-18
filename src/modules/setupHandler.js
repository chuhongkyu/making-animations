import { getBPM, getModel, getSoundName } from "../utils/store";
import createModel from "./createModel";
import uploadModel from "./uploadModel";
import uploadSound from "./uploadSound";

function setupModelUpload(scene) {
    const fileModelWrapper = document.querySelector('.model-file-wrapper');
    document.getElementById('upload-model-button').addEventListener('click', async () => {
        const fileInput = document.getElementById('model-file-input');
        const file = fileInput.files[0];
        if (file) {
            await uploadModel(file, scene);
            updateAudioControls()
            fileModelWrapper.classList.add('clear')
        }
    });
}

function setupSoundUpload(scene) {
    const fileSoundWrapper = document.querySelector('.sound-file-wrapper');
   
    document.getElementById('upload-sound-button').addEventListener('click', async () => {
        const fileInput = document.getElementById('sound-file-input');
        const file = fileInput.files[0];
        if (file) {
            await uploadSound(file);
            createModel(scene)
            updateAudioControls()
            fileSoundWrapper.classList.add('clear')
        }
   });
}

function updateAudioControls() {
    const audioControls = document.querySelector('.audio-controls');
    const bpmText = audioControls.querySelector('.bpm-text');
    const soundNameText = audioControls.querySelector('.music-name');
    bpmText.innerHTML = '';
    const { fileName } = getModel();
    const bpm = getBPM();
    const soundName = getSoundName();

    if (fileName && bpm > 0) {
        soundNameText.innerHTML = 'Music:' + soundName;
        bpmText.innerHTML = 'BPM:' + bpm;
        audioControls.classList.add('active');
    } else {
        audioControls.classList.remove('active');
    }
}

export { setupModelUpload, setupSoundUpload };