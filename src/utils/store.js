let bpm = 0;
let duration = 0;
let isPlaying = false;
let model = {
    url: null,
    fileName: null,
};


export function setBPM(newBPM) {
    bpm = newBPM;
}

export function getBPM() {
    return bpm;
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