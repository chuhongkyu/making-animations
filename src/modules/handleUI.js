import { getIsRecording, setIsRecording } from "../utils/store";
import { startCapture, stopCapture } from "./setupCapture";


function handleUI() {
    const fileSoundWrapper = document.querySelector('.sound-file-wrapper');
    const fileSoundInput = document.getElementById('sound-file-input');
    const fileModelWrapper = document.querySelector('.model-file-wrapper');
    const fileModelInput = document.getElementById('model-file-input');
    
    const updateLabel = (input, label) => {
        const file = input.files[0];
        if (file) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    };

    fileSoundInput.addEventListener('change', () => updateLabel(fileSoundInput, fileSoundWrapper));
    fileModelInput.addEventListener('change', () => updateLabel(fileModelInput, fileModelWrapper));

    updateLabel(fileSoundInput, fileSoundWrapper);
    updateLabel(fileModelInput, fileModelWrapper);

    const recordBtn = document.getElementById('record-btn');

    recordBtn.addEventListener('click', () => {
        if (!getIsRecording()) {
            setIsRecording(true);
            recordBtn.classList.add('on-air');
            recordBtn.classList.remove('stop');
            startCapture();
        } else {
            setIsRecording(false);
            recordBtn.classList.remove('on-air');
            recordBtn.classList.add('stop');
            stopCapture()
        }
    });
}

export { handleUI };
