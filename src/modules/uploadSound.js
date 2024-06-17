import { analyze, guess } from 'web-audio-beat-detector';
import { setBPM, setDuration, setIsPlaying } from '../utils/store';

async function uploadSound(file) {
    // if (file) console.log("File type:", file.type);
    if (file && (file.type === 'audio/mp3' || file.type === 'audio/mpeg' || file.type === 'audio/wav')) {
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

            setBPM(bpm);
            setDuration(audioBuffer.duration);

            audioPlayer.onplay = () => {
                setIsPlaying(true);
            };

            audioPlayer.onpause = () => {
                setIsPlaying(false);
            };

            audioPlayer.onended = () => {
                setIsPlaying(false);
            };
        } catch (error) {
            console.error("Error detecting BPM:", error);
        }
    } else {
        alert('Please upload a valid MP3 or WAV file.');
    }
}

export default uploadSound;