let capturer;

export function initCapture(canvas) {
    if (typeof window.CCapture !== 'undefined') {
        
        capturer = new window.CCapture({
            format: 'gif',
            framerate: 30,
            workersPath: 'js/gif.worker.js',
            // verbose: true,
            quality: 0.6,
            name: '3DAnimation',
            // display: true,
        });
        console.log('new Capture', capturer);
    } else {
        console.error("Error");
    }
}

export function startCapture() {
    if (capturer) {
        capturer.start();
        
    }
}

export function captureCanvas(canvas){
    if (capturer) {
        capturer.capture(canvas);
    }
}

export function stopCapture() {
    if (capturer) {
        capturer.stop();
        capturer.save();
    }
}
