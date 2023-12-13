// frameProcessor.js
export async function processFrame(videoElement, pyodide) {
	if (!videoElement || !pyodide) return;

	// console.log('Processing frame');

	// Capture a frame from the video element
	const canvas = document.createElement('canvas');
	canvas.width = videoElement.videoWidth;
	canvas.height = videoElement.videoHeight;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	// Convert image data to a format that Pyodide can understand
	const data = new Uint8ClampedArray(imageData.data.buffer);

	// await pyodide.runPythonAsync(`
	//     from Board import Board
	//     board = Board()
	//     board.process_frame(${JSON.stringify(Array.from(data))}, ${canvas.width}, ${canvas.height})
	// `);
}
