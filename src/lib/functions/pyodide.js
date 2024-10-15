import { pArea, pIDs, pFencedTiles, pyodideRan, boardOccupiedTiles, pResultString, optimalArea, optimalAreaKnown } from '$lib/store/pentominos';
import { isModalOpen } from '$lib/store/store';
import { pentominosKey } from '$lib/graphics/pentominos';

import { fetchLeaderboard, setNewPlayerID } from '$lib/backend/api';
import { leaderboard } from '$lib/store/data';
import { fetchOptimals } from '../backend/api';

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

	let canvas = document.createElement('canvas');
	canvas.width = actualVideoWidth;
	canvas.height = actualVideoHeight;

	const ctx = canvas.getContext('2d');
	ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	console.log(imageData);
	const dataBuffer = imageData.data.buffer;
	console.log(dataBuffer);


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
		pResultString.set(`${result}`);
		if (typeof window.pyodide.globals.get('result') !== 'string') {
			let pOut = window.pyodide.globals.get('result').toJs();
			console.log(pOut);
			//pArea.set(pOut.get('area'));
			pArea.set(window.pyodide.globals.get('area'));
			//pFencedTiles.set(pOut.get('fencedTiles'));
			pFencedTiles.set(window.pyodide.globals.get('fencedAreas').toJs());
			let pIDNums = window.pyodide.globals.get('ids').toJs();
			let optimal = await fetchOptimals(pIDNums);
			if (optimal.length > 0)
			{
				optimalArea.set(optimal[0].Area);
				optimalAreaKnown.set(true);
			}
			else if (pIDNums.length == 12 && optimal.length == 0)
			{
				optimalArea.set(125);
				optimalAreaKnown.set(true);
				console.log('125 set');
			}
			else{optimalAreaKnown.set(false);}
			let pIDLets = '';
			let newAdd = '';
			for (let i = 0; i < pIDNums.length; i++) {
				newAdd = pentominosKey[pIDNums[i]];
				if (newAdd != undefined){
					pIDLets += newAdd;
				}
			}
			pIDs.set(pIDLets);
			
			boardOccupiedTiles.set(pOut.get('boardPentList'));
			setNewPlayerID();
			isModalOpen.set(true);

			// basic leadeboard fetch, function itself should handle error case
			let leaderboard_data = await fetchLeaderboard(pIDLets);
			leaderboard.set(leaderboard_data);
			console.log('leaderboard_data', leaderboard_data);
			pyodideRan.set(true);
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
					rotations = np.asarray(result['rotations'])
					flips = np.asarray(result['flips'])
					coords = np.asarray(result['flips'])

				result
		`);
		console.log(`${result}`);
		pResultString.set(`${result}`);
		if (typeof window.pyodide.globals.get('result') !== 'string') {
			let pOut = window.pyodide.globals.get('result').toJs();
			console.log(pOut);
			//pArea.set(pOut.get('area'));
			pArea.set(window.pyodide.globals.get('area'));
			//pFencedTiles.set(pOut.get('fencedTiles'));
			pFencedTiles.set(window.pyodide.globals.get('fencedAreas').toJs());
			let pIDNums = pOut.get('id');
			let optimal = await fetchOptimals(pIDNums);
			if (optimal.length > 0)
			{
				console.log(optimal)
				console.log(pIDNums)
				console.log('optimal is '+ optimal[0].Area)
				optimalArea.set(optimal[0].Area);
				optimalAreaKnown.set(true);
			}
			else if (pIDNums.length == 12 && optimal.length == 0)
			{
				optimalArea.set(125);
				optimalAreaKnown.set(true);
				console.log('125 set');
			}
			else{optimalAreaKnown.set(false);}
			let pIDLets = '';
			let newAdd = '';
			for (let i = 0; i < pIDNums.length; i++) {
				newAdd = pentominosKey[pIDNums[i]];
				if (newAdd != undefined){
					pIDLets += newAdd;
				}
			}
			pIDs.set(pIDLets);
			setNewPlayerID();
			isModalOpen.set(true);

			// basic leadeboard fetch, function itself should handle error case
			let leaderboard_data = await fetchLeaderboard(pIDLets);
			leaderboard.set(leaderboard_data);
			console.log('leaderboard_data', leaderboard_data);
			pyodideRan.set(true);
		} else {
			alert(`Result from Python: ${result}`);
		}
	} catch (error) {
		console.error('Error in processBoard:', error);
		alert(`Result from Python: ${error}`);
	}
}