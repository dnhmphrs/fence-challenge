import { pArea, pIDs, pFencedTiles, pyodideRan, boardOccupiedTiles } from '$lib/store/pentominos';
import { isModalOpen } from '$lib/store/store';
import { pentominosKey } from '$lib/graphics/pentominos';

import { fetchLeaderboard } from '$lib/backend/api';
import { leaderboard } from '$lib/store/data';

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
				if type(result) != str:
					area = str(result['area'])
					fencedAreas = np.asarray(result['fencedTiles'])
					ids = np.asarray(result['id'])

				result
		`);
		console.log(`${result}`);
		if (typeof window.pyodide.globals.get('result') !== 'string') {
			let pOut = window.pyodide.globals.get('result').toJs();
			console.log(pOut);
			//pArea.set(pOut.get('area'));
			pArea.set(window.pyodide.globals.get('area'));
			//pFencedTiles.set(pOut.get('fencedTiles'));
			pFencedTiles.set(window.pyodide.globals.get('fencedAreas').toJs());
			let pIDNums = window.pyodide.globals.get('ids').toJs();
			let pIDLets = '';
			for (let i = 0; i < pIDNums.length; i++) {
				pIDLets += pentominosKey[pIDNums[i]];
			}
			pIDs.set(pIDLets);
			pyodideRan.set(true);
			boardOccupiedTiles.set(pOut.get('boardPentList'));
			isModalOpen.set(true);

			// basic leadeboard fetch, function itself should handle error case
			let leaderboard_data = fetchLeaderboard('ED9C2565');
			leaderboard.set(leaderboard_data);
			console.log('leaderboard_data', leaderboard_data);
		} else {
			alert(`Result from Python: ${result}`);
		}
	} catch (error) {
		console.error('Error in processFrame:', error);
		alert(`Result from Python: ${error}`);
	}
}

export async function processBoard(
	pentominoNums,
	pentominoCoords,
	pentominoRotations,
	pentominoFlip
) {
	try {
		window.pyodide.globals.set('pentominoNums', pentominoNums);
		window.pyodide.globals.set('pentominoCoords', pentominoCoords);
		window.pyodide.globals.set('pentominoRotations', pentominoRotations);
		window.pyodide.globals.set('pentominoFlip', pentominoFlip);

		const result = await window.pyodide.runPythonAsync(`
				import numpy as np
				import FenceChallenge.board_new

				pentominoNums = np.array(globals().get('pentominoNums')).tolist()
				pentominoCoords = np.array(globals().get('pentominoCoords')).tolist()
				pentominoRotations = np.array(globals().get('pentominoRotations')).tolist()
				pentominoFlip = np.array(globals().get('pentominoFlip')).tolist()

				result = FenceChallenge.board_new.GetAreaInfo(pentominoNums, pentominoCoords, pentominoRotations, pentominoFlip)

				if type(result) != str:
					area = str(result['area'])
					fencedAreas = np.asarray(result['fencedTiles'])

				result
		`);
		console.log(`${result}`);
		if (typeof window.pyodide.globals.get('result') !== 'string') {
			let pOut = window.pyodide.globals.get('result').toJs();
			console.log(pOut);
			//pArea.set(pOut.get('area'));
			pArea.set(window.pyodide.globals.get('area'));
			//pFencedTiles.set(pOut.get('fencedTiles'));
			pFencedTiles.set(window.pyodide.globals.get('fencedAreas').toJs());
			let pIDNums = pOut.get('id');
			let pIDLets = '';
			for (let i = 0; i < pIDNums.length; i++) {
				pIDLets += pentominosKey[pIDNums[i]];
			}
			pIDs.set(pIDLets);
			pyodideRan.set(true);
			isModalOpen.set(true);

			// basic leadeboard fetch, function itself should handle error case
			let leaderboard_data = fetchLeaderboard(pIDLets);
			leaderboard.set(leaderboard_data);
			console.log('leaderboard_data', leaderboard_data);
		} else {
			alert(`Result from Python: ${result}`);
		}
	} catch (error) {
		console.error('Error in processBoard:', error);
		alert(`Result from Python: ${error}`);
	}
}
