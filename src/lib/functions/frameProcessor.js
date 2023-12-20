// frameProcessor.js
export async function processFrame(videoElement, pyodide) {
	if (!videoElement || !pyodide) return;

	// console.log('Processing frame');

	// Capture a frame from the video element
	const canvas = document.createElement('canvas');
	// const scale = window.devicePixelRatio;
	const scale = 1;
	canvas.width = videoElement.videoWidth * scale;
	canvas.height = videoElement.videoHeight * scale;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
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
		pyodide.globals.set('width', canvas.width * scale);
		pyodide.globals.set('height', canvas.height * scale);

		const result = await pyodide.runPythonAsync(`
				import numpy as np
				imageBuffer = np.array(globals().get('imageBuffer'))
				width = globals().get('width')
				height = globals().get('height')
				img_array = np.frombuffer(imageBuffer, dtype=np.uint8).reshape((height, width, 4))

				# Convert RGBA to BGR for OpenCV
				img_bgr = img_array[..., :3][:,:,::-1]

				import FenceChallenge.board_new
				result = FenceChallenge.board_new.GetPentominos(img_bgr)
				result
		`);
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
