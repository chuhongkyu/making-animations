import { setCanvasCapture } from '../utils/store';

async function setupCanvasCapture() {
    if (typeof window !== 'undefined') {
        const { CanvasCapture } = await import('canvas-capture');
        CanvasCapture.init(document.getElementById('view-canvas'), {
            showRecDot: true,
            verbose: false,
            width: 640,
            height: 480
        });

        setCanvasCapture(CanvasCapture);
    }
}

export default setupCanvasCapture;
