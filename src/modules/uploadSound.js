import { analyze, guess } from 'web-audio-beat-detector';

async function uploadSound(file) {
    if (file && (file.type === 'audio/mp3' || file.type === 'audio/wav')) {
        const audioPlayer = document.getElementById('audio-player');
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        audioPlayer.load();

        try {
            const arrayBuffer = await file.arrayBuffer();
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            const { bpm, offset, tempo } = await guess(audioBuffer);
            console.log(`Initial BPM: ${bpm}, Offset: ${offset}, Tempo: ${tempo}`);
            //bpm을 전달해야함.
        } catch (error) {
            console.error("Error detecting BPM:", error);
        }
    } else {
        alert('Please upload a valid MP3 or WAV file.');
    }
}

export default uploadSound;