import { setCanvasCapture } from '../utils/store';

async function setupCanvasCapture() {
    if (typeof window !== 'undefined') {
        const { CanvasCapture } = await import('canvas-capture');
        const canvas = document.getElementById('view-canvas');
        CanvasCapture.init(canvas, {
            showRecDot: false,
            verbose: false,
        });

        setCanvasCapture(CanvasCapture);
    }
}

export default setupCanvasCapture;
