import { startCapturing, stopCapturing } from "./setupCaptureFrame";
import { getIsRecording } from "../utils/store";

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
    const modal = document.querySelector('.progress-modal');

    recordBtn.addEventListener('click', async () => {
        if (!getIsRecording()) {
            startCapturing(recordBtn);
          } else {
            stopCapturing(recordBtn);
            modal.classList.add('active');
            const response = await fetch('http://localhost:3000/generate-gif');
            if (response.ok) {
              const blob = await response.blob();
              modal.classList.remove('active');
        
              const exportSpan = document.createElement('span');
              exportSpan.className = 'record-export';
              
              const exportSmall = document.createElement('small');
              exportSmall.textContent = 'GIF';
              exportSpan.appendChild(exportSmall);
              
              const exportLink = document.createElement('a');
              exportLink.href = URL.createObjectURL(blob);
              exportLink.download = 'animation.gif';
              exportLink.textContent = 'Download';
              exportSpan.appendChild(exportLink);
              
              const audioControls = document.querySelector('.audio-controls');
              audioControls.appendChild(exportSpan);
            } else {
              modal.classList.remove('active');
              console.error('Failed to generate GIF');
            }
        }
    });
}

export { handleUI };
