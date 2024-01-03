// import { dev } from '$app/environment';

// frameProcessor.js
export async function processFrame(videoElement, actualVideoWidth, actualVideoHeight, pyodide) {
	if (!videoElement || !pyodide) return;

	// console.log('Processing frame');

	// Capture a frame from the video element
	const canvas = document.createElement('canvas');
	// const scale = devicePixelRatio;
	canvas.width = actualVideoWidth;
	canvas.height = actualVideoHeight;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

	// get videoElement aspect ratio for scale
	// console.log(devicePixelRatio, videoElement.videoWidth, videoElement.videoHeight, scale);

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const dataBuffer = imageData.data.buffer;

	// Convert RGBA to BGR
	// const data = new Uint8ClampedArray(imageData.data.length);
	// for (let i = 0, j = 0; i < imageData.data.length; i += 4, j += 3) {
	// 	data[j] = imageData.data[i + 2]; // Blue
	// 	data[j + 1] = imageData.data[i + 1]; // Green
	// 	data[j + 2] = imageData.data[i]; // Red
	// }

	await pyodide.loadPackage(['numpy', 'pandas', 'opencv-python']);
	const wheelUrl = '/python/FenceChallenge-0.0.1-py3-none-any.whl';
	await pyodide.loadPackage(wheelUrl);

	// console.log(JSON.stringify(Array.from(data)));
	// console.log(dataBuffer);

	try {
		pyodide.globals.set('imageBuffer', new Uint8ClampedArray(dataBuffer));
		pyodide.globals.set('width', canvas.width);
		pyodide.globals.set('height', canvas.height);

		const result = await pyodide.runPythonAsync(`
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

	// const result = await pyodide.runPythonAsync(`
	// 		import FenceChallenge.board_new
	// 		# dir(FenceChallenge.board_new)
	// 		FenceChallenge.board_new.GetPentominos(${JSON.stringify(Array.from(data))})
	// 		# FenceChallenge.board_new.GetPentominos('/test.jpg')
	// 		# FenceChallenge.board_new.get_areas('/test.jpg')
	// `);
	// alert(`Result from Python:${result}`);

	// await pyodide.runPythonAsync(`
	//     from Board import Board
	//     board = Board()
	//     board.process_frame(${JSON.stringify(Array.from(data))}, ${canvas.width}, ${canvas.height})
	// `);
}
