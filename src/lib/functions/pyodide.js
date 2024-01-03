// load pyodide on site load
export async function handleLoadPyodide() {
	window.pyodide = await window.loadPyodide();
	await window.pyodide.runPythonAsync(`
				import sys
				sys.path.append('/python')
		`);
	await window.pyodide.loadPackage(['numpy', 'pandas', 'opencv-python']);
	const wheelUrl = '/python/FenceChallenge-0.0.1-py3-none-any.whl';
	await window.pyodide.loadPackage(wheelUrl);
	console.log('pyodide loaded');
}

// frameProcessor.js
export async function processFrame(videoElement, actualVideoWidth, actualVideoHeight) {
	if (!videoElement || !window.pyodide) return;

	// console.log('Processing frame');

	// Capture a frame from the video element
	const canvas = document.createElement('canvas');
	canvas.width = actualVideoWidth;
	canvas.height = actualVideoHeight;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const dataBuffer = imageData.data.buffer;

	try {
		window.pyodide.globals.set('imageBuffer', new Uint8ClampedArray(dataBuffer));
		window.pyodide.globals.set('width', canvas.width);
		window.pyodide.globals.set('height', canvas.height);

		const result = await window.pyodide.runPythonAsync(`
				import numpy as np
				import FenceChallenge.board_new

				imageBuffer = np.array(globals().get('imageBuffer'))
				width = globals().get('width')
				height = globals().get('height')

				# imageBuffer
				img_array = np.reshape(imageBuffer, (height, width, 4))

				# Convert RGBA to BGR for OpenCV
				img_bgr = img_array[..., [2, 1, 0]]
				img_bgr = img_bgr.astype(np.uint8)

				result = FenceChallenge.board_new.GetPentominos(img_bgr)
				result
		`);
		console.log(`${result}`);
		alert(`Result from Python: ${result}`);
	} catch (error) {
		console.error('Error in processFrame:', error);
		alert(`Result from Python: ${error}`);
	}
}
