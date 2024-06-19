import { getCanvasCapture, getIsPlaying, getIsRecording, setIsRecording } from "../utils/store";
import setupCanvasCapture from "./setupCanvasCapture";

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
        let canvasCapture = getCanvasCapture();
        if (!canvasCapture) {
            await setupCanvasCapture();
            canvasCapture = getCanvasCapture();
            console.log('canvasCapture',)
        }

        if (!getIsRecording()) {
            canvasCapture.beginGIFRecord({
                name: '3DANI',
                // 프레임을 
                fps: 10,
                quality: 0.1,
                onExportProgress: (progress) => {
                    modal.classList.add('active')
                    const progressBar = document.getElementById('progress-bar');
                    progressBar.style.width = `${progress * 100}%`;
                    progressBar.textContent = `Progress: ${(progress * 100).toFixed(2)}%`;
                },
                onExport: (blob, filename) => {
                    const exportSpan = document.createElement('span');
                    exportSpan.className = 'record-export';
                    
                    const exportSmall = document.createElement('small');
                    exportSmall.textContent = 'GIF';
                    exportSpan.appendChild(exportSmall);
                    
                    const exportLink = document.createElement('a');
                    exportLink.href = URL.createObjectURL(blob);
                    exportLink.download = filename;
                    exportLink.textContent = 'Download';
                    exportSpan.appendChild(exportLink);
                    
                    const audioControls = document.querySelector('.audio-controls');
                    audioControls.appendChild(exportSpan);
                },
                onExportFinish: () => {
                    alert('GIF recording finished');
                    modal.classList.remove('active')
                },
                onError: (error) => {
                    console.error('GIF recording error:', error);
                },
            });
            setIsRecording(true);
            recordBtn.classList.add('on-air');
            recordBtn.classList.remove('stop');
        } else {
            canvasCapture.stopRecord();
            setIsRecording(false);
            recordBtn.classList.remove('on-air');
            recordBtn.classList.add('stop');
        }
    });
}

export { handleUI };
