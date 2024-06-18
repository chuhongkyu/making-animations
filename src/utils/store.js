let bpm = 0;
let soundFileName = null;
let duration = 0;
let isPlaying = false;
let model = {
    url: null,
    fileName: null,
};
let canvasCapture = null;
let isRecording = false;

export function setBPM(newBPM) {
    bpm = newBPM;
}

export function getBPM() {
    return bpm;
}

export function setSoundName(newName) {
    soundFileName = newName;
}

export function getSoundName() {
    return soundFileName;
}

export function setDuration(newDuration) {
    duration = newDuration;
}

export function getDuration() {
    return duration;
}

export function setIsPlaying(playing) {
    isPlaying = playing;
}

export function getIsPlaying() {
    return isPlaying;
}

export function setModel(newModel) {
    model = newModel;
}

export function getModel() {
    return model;
}

export function setCanvasCapture(capture) {
    canvasCapture = capture;
}

export function getCanvasCapture() {
    return canvasCapture;
}

export function setIsRecording(recording) {
    isRecording = recording;
}

export function getIsRecording() {
    return isRecording;
}
