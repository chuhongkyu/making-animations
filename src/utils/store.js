let bpm = 0;
let duration = 0;
let isPlaying = false;

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