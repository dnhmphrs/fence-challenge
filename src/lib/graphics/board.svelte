<script>
  import { onMount, onDestroy } from 'svelte';
	import {pentominosDict} from './pentominos.js';
  import * as THREE from 'three';

	let pentominos = [];
  export let nonParallaxGroup;
  export let screenType;
	export let gameMode;

  const webgameGroup = new THREE.Group();

	onMount(() => {
    createPentominos();
    if (gameMode & !webgameGroup.children.length) {
        cleanUpBoard();
        createBoard();
        pentominos.forEach((pentomino, i) => {
            const gridX = Math.floor(Math.random() * gridSize);
            const gridY = Math.floor(Math.random() * gridSize);
            placePentomino(pentomino, gridX, gridY);
        });
    }
});


  onDestroy(() => {
    cleanUpBoard();
  });

	// -----------------------------------------------------------------------------
	//  BOARD REPRESENTATION
	// -----------------------------------------------------------------------------
	const gridSize = 20; // Assuming a 20x20 grid
	let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));

	function gridToWorldPosition(gridX, gridY, cellSize) {
    const worldX = gridX * cellSize - gridSize * cellSize / 2 + cellSize / 2;
    const worldY = gridY * cellSize - gridSize * cellSize / 2 + cellSize / 2;
    return { x: worldX, y: worldY };
	}

  // -----------------------------------------------------------------------------
	//  LOAD & WEBGAME ELEMENTS
	// -----------------------------------------------------------------------------

function createGrid() {
	const backgroundGeo = new THREE.BoxGeometry(1.1, 1.1, 0.001);
	const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x232323 });
	const background = new THREE.Mesh(backgroundGeo, backgroundMaterial);
	// background.rotateX(Math.PI / 2);
	background.position.z = 0.00;
	background.material.opacity = .75;
	background.material.transparent = true;

	const grid = new THREE.GridHelper(1.1, 20, 0xd0d0d0, 0xd0d0d0);
	grid.transparent = true;
	grid.opacity = 0.5;
	grid.rotateX(Math.PI / 2);
	grid.position.z = 0.001;
	grid.material.opacity = 1;
	grid.material.transparent = true;

	if ( $screenType == 1 )	webgameGroup.position.y = 0.225

	webgameGroup.add(grid, background);
	nonParallaxGroup.add(webgameGroup);
}

// -----------------------------------------------------------------------------
//  LOAD & RENDER PENTOMINOS
// -----------------------------------------------------------------------------

// for item in /pentonimos/*.png, load the image, create a plane, and add it to the scene
export function createPentominos() {
	const loader = new THREE.TextureLoader();
	// transparent plane, visible image

	for (let i = 0; i < 12; i++) {
		let pentominoTile = new THREE.Group();

		const texture = loader.load(`/pentominos-graphic/${pentominosDict[i].letter}.png`);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		let scale = .062
		let width = pentominosDict[i].width * scale;
		let height = pentominosDict[i].height * scale;
		const geometry = new THREE.PlaneGeometry(width, height);
		const material = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			opacity: 1,
		});
		const plane = new THREE.Mesh(geometry, material);
		plane.position.z = 0.002;
		plane.name = `pentomino${i}`;

		pentominoTile.add(plane);
		pentominoTile.position.z = 0.0;

		// tweak to fit grid snugly
		pentominoTile.scale.set(0.9, 0.9, 0.9);
		pentominoTile.position.x -= .094;
		pentominoTile.position.y -= .0925;

		// ranom assign
		// pentominosDict[i].gridPosition = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };

		// Convert grid position to world position
		const cellSize = 1.1 / gridSize; // Assuming your grid size is 1.1 units
    const gridPos = pentominosDict[i].gridPosition;
    const worldPos = gridToWorldPosition(gridPos.x, gridPos.y, cellSize);

    pentominoTile.position.x = worldPos.x;
    pentominoTile.position.y = worldPos.y;

		pentominos.push(pentominoTile);
	}
}

export function createBoard() {
  createGrid();
}

export function placePentomino(pentomino, gridX, gridY) {
    let validPosition = isValidPosition(gridX, gridY) ? { x: gridX, y: gridY } : findNearestAvailablePosition(gridX, gridY);

    if (validPosition) {
        const cellSize = 1.1 / gridSize;
        const worldPos = gridToWorldPosition(validPosition.x, validPosition.y, cellSize);

        pentomino.position.x = worldPos.x;
        pentomino.position.y = worldPos.y;
        
        // Mark the grid as occupied
        grid[validPosition.x][validPosition.y] = pentomino;
				webgameGroup.add(pentomino)
    } else {
        console.log("No valid position found for the pentomino.");
    }
}

// THIS FUNCTION ALSO NEEDS TO ACCOUNT FOR SHAPE, ROTATION, ORIENTATION ETC.
function isValidPosition(gridX, gridY) {
    // Check grid bounds
    if (gridX < 0 || gridX >= gridSize || gridY < 0 || gridY >= gridSize) {
        return false; // Out of bounds
    }
    // Check if the cell is already occupied
    return grid[gridX][gridY] === null;
}

function findNearestAvailablePosition(gridX, gridY) {
    let visited = new Set([`${gridX},${gridY}`]);
    let queue = [[gridX, gridY]];

    while (queue.length > 0) {
        let [x, y] = queue.shift();

        if (isValidPosition(x, y)) {
            return { x, y };
        }

        // Add adjacent positions to the queue
        [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].forEach(([nextX, nextY]) => {
            let key = `${nextX},${nextY}`;
            if (!visited.has(key)) {
                visited.add(key);
                if (nextX >= 0 && nextX < gridSize && nextY >= 0 && nextY < gridSize) {
                    queue.push([nextX, nextY]);
                }
            }
        });
    }

    return null; // In case no available position is found
}


export function cleanUpBoard() {
    // Assuming the grid is directly added to nonParallaxGroup or scene
    webgameGroup.children.forEach(child => {
        if (child.material) {
            child.material.dispose(); // Dispose material
        }
        if (child.geometry) {
            child.geometry.dispose(); // Dispose geometry
        }
        // webgameGroup.remove(child); // Remove from scene
    });
		nonParallaxGroup.remove(webgameGroup);

    // Remove other webgame-specific elements if they exist
    // For example, pentominos or other objects added to the scene for the webgame mode
}

</script>

<!-- Add any necessary HTML or markup here -->
