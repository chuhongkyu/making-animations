import { getBPM, getModel, getSoundName } from "../utils/store";
import createModel from "./createModel";
import uploadModel from "./uploadModel";
import uploadSound from "./uploadSound";

function setupModelUpload(scene) {
    const fileInput = document.getElementById('model-file-input');
    const description = document.querySelector('.model-file-wrapper .description');
    fileInput.addEventListener('change', async () => {
        const file = fileInput.files[0];
        if (file) {
            let fileName = file.name;
            if (fileName.length > 5) {
                fileName = fileName.substring(0, 5) + '...';
            }
            description.innerHTML = fileName + '';
            await uploadModel(file, scene);
            updateAudioControls();
            fileInput.value = '';
        }
    });
}

function setupSoundUpload(scene) {
    const fileInput = document.getElementById('sound-file-input');
    const description = document.querySelector('.sound-file-wrapper .description');
    fileInput.addEventListener('change', async () => {
        const file = fileInput.files[0];
        if (file) {
            let fileName = file.name;
            if (fileName.length > 5) {
                fileName = fileName.substring(0, 5) + '...';
            }
            description.innerHTML = fileName + '';
            await uploadSound(file);
            createModel(scene);
            updateAudioControls();
            fileInput.value = '';
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
