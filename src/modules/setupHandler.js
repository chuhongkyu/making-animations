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

function setupSoundUpload() {
    document.getElementById('upload-sound-button').addEventListener('click', async () => {
        const fileInput = document.getElementById('sound-file-input');
        const file = fileInput.files[0];
        if (file) {
            await uploadSound(file);
        }
   });
}

export { setupModelUpload, setupSoundUpload };