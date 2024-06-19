import { setCanvasCapture } from '../utils/store';

async function setupCanvasCapture() {
    if (typeof window !== 'undefined') {
        const { CanvasCapture } = await import('canvas-capture');
        CanvasCapture.init(document.getElementById('view-canvas'), {
            showRecDot: false,
            verbose: false,
            width: 500,
            height: 500
        });

        setCanvasCapture(CanvasCapture);
    }
}

export default setupCanvasCapture;
