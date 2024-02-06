<script>
  import { onMount, onDestroy } from 'svelte';
  import { selectedPentominos } from '$lib/store/pentominos.js';
	import { pentominosKey, pentominosDict } from './pentominos.js';
  import * as THREE from 'three';

  let pentominoObjects = {}; 
  export let nonParallaxGroup;
  export let screenType;
	export let gameMode;

  const webgameGroup = new THREE.Group();

  onMount(() => {
		createPentominos();
		if (gameMode & !webgameGroup.children.length) {
			createBoard();
		}
  });


  onDestroy(() => {
    cleanUpBoard();
  });

  // -----------------------------------------------------------------------------
	//  HANDLE PENTOMINO SELECTION
	// -----------------------------------------------------------------------------

  $: {
    // Add selected pentominos to the board
    $selectedPentominos.forEach(letter => {
      if (pentominoObjects[letter] && !webgameGroup.children.includes(pentominoObjects[letter])) {
        const pentomino = pentominoObjects[letter];
        const gridX = Math.floor(Math.random() * gridSize); // Or other logic for positioning
        const gridY = Math.floor(Math.random() * gridSize);
        // console.log(gridX, gridY)
        placePentomino(pentomino, gridX, gridY); // Ensure this adds pentomino to webgameGroup
        webgameGroup.add(pentomino)
      }
    });

    // Remove deselected pentominos from the board
    Object.keys(pentominoObjects).forEach(key => {
      const pentomino = pentominoObjects[key];
      if (!$selectedPentominos.includes(key) && webgameGroup.children.includes(pentomino)) {
        webgameGroup.remove(pentomino);
        // Update grid or other state as needed
      }
    });
  }


  export function getPentominos() {
    return Object.values(pentominoObjects);
  }
	// -----------------------------------------------------------------------------
	//  BOARD REPRESENTATION
	// -----------------------------------------------------------------------------

	const gridSize = 20; // Assuming a 20x20 grid
	let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));

  function placeInGrid(pentomino, gridX, gridY) {
    markGridOccupied(gridX, gridY);
    // console.log('grid', grid)
    grid[gridX][gridY] = pentomino;
  }

  function freeFromGrid(gridX, gridY) {
    markGridFree(gridX, gridY);
    grid[gridX][gridY] = null;
  }

  function markGridOccupied(gridX, gridY) {
    grid[gridX][gridY] = true;
  }

  function markGridFree(gridX, gridY) {
    grid[gridX][gridY] = null;
  }

  export function pickUpPentomino(pentominoID) {
    const pentomino = pentominoObjects[pentominoID];
    const gridPosition = worldToGridPosition(pentomino.position.x, pentomino.position.y);
    freeFromGrid(gridPosition.x, gridPosition.y);
  }

	function gridToWorldPosition(gridX, gridY) {
    const cellSize = 1.1 / gridSize;
    const worldX = gridX * cellSize - gridSize * cellSize / 2 + cellSize / 2;
    const worldY = gridY * cellSize - gridSize * cellSize / 2 + cellSize / 2;
    return { x: worldX, y: worldY };
	}
  
  function worldToGridPosition(worldX, worldY) {
    const cellSize = 1.1 / gridSize;
    const gridX = Math.floor((worldX + gridSize * cellSize / 2) / cellSize);
    const gridY = Math.floor((worldY + gridSize * cellSize / 2) / cellSize);
    console.log('gridx, gridy', gridX, gridY)
    return { x: gridX, y: gridY };
  }

// -----------------------------------------------------------------------------
//  LOAD & RENDER PENTOMINOS
// -----------------------------------------------------------------------------

// for item in /pentonimos/*.png, load the image, create a plane, and add it to the scene
export function createPentominos() {
	const loader = new THREE.TextureLoader();
  
	for (let i = 1; i < 13; i++) {
		// let pentominoTile = new THREE.Group();

    let pentominoID  = pentominosKey[i];

		const texture = loader.load(`/pentominos-graphic/${pentominoID}.png`);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		let scale = .055
		let width = pentominosDict[pentominoID].width * scale;
		let height = pentominosDict[pentominoID].height * scale;
		const geometry = new THREE.PlaneGeometry(width, height);
		const material = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			opacity: 1,
		});
		const plane = new THREE.Mesh(geometry, material);
		plane.name = `${pentominoID}`;

		// pentominoTile.add(plane);
    // pentominoTile.name = `${pentominoID}`;
    plane.name = `${pentominoID}`;
    pentominoObjects[pentominoID] = plane;
	}
}

// for each cell in the grid, create a plane and add it to the scene
// INPUT CODE HERE

// -----------------------------------------------------------------------------
//  CREATE BORAD
// -----------------------------------------------------------------------------

export function createBoard() {
  cleanUpBoard();
  createGrid();
  createGridCells();

  changeCellColor(19, 19, 0x00FF00);
  changeCellColor(10, 10, 0xff00ff);
  changeCellColor(9, 10, 0xff00ff);
  changeCellColor(9, 11, 0xff00ff);
  changeCellColor(0, 0, 0x00FF00);
}

function createGrid() {
	const backgroundGeo = new THREE.BoxGeometry(1.1, 1.1, 0.001);
	const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x232323 });
	const background = new THREE.Mesh(backgroundGeo, backgroundMaterial);
	// background.rotateX(Math.PI / 2);
	background.position.z = -0.002;
	background.material.opacity = .75;
	background.material.transparent = true;

	const grid = new THREE.GridHelper(1.1, 20, 0xd0d0d0, 0xd0d0d0);
	grid.transparent = true;
	grid.opacity = 0.5;
	grid.rotateX(Math.PI / 2);
	grid.position.z = -0.001;
	grid.material.opacity = 1;
	grid.material.transparent = true;

	if ( $screenType == 1 )	webgameGroup.position.y = 0.225

	webgameGroup.add(grid, background);
	nonParallaxGroup.add(webgameGroup);
}

let cellPlanes = {}; // Dictionary to store cell planes

function createGridCells() {
  // const loader = new THREE.TextureLoader();
  const cellSize = 1.1 / gridSize; // Assuming a square grid cell

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Create geometry and material for each cell
      const geometry = new THREE.PlaneGeometry(cellSize, cellSize);
      const material = new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity:0 }); // Default color

      // Create plane and position it
      const plane = new THREE.Mesh(geometry, material);
      const worldPos = gridToWorldPosition(i, j);
      plane.scale.set(1.025, 1.025, 1.025);
      worldPos.x -= 0.0004;
      worldPos.y -= 0.0004;
      plane.position.set(worldPos.x, worldPos.y, 0.0);

      // Add plane to the scene or group
      webgameGroup.add(plane);

      // Store the reference to the plane
      if (!cellPlanes[i]) cellPlanes[i] = {};
      cellPlanes[i][j] = plane;
    }
  }
}

// Function to change color of a specific cell
function changeCellColor(x, y, color) {
  if (cellPlanes[x] && cellPlanes[x][y]) {
    cellPlanes[x][y].material.color.set(color);
    cellPlanes[x][y].material.opacity = 1;
  }
}

function clearCellColor(x, y) {
  if (cellPlanes[x] && cellPlanes[x][y]) {
    cellPlanes[x][y].material.opacity = 0;
  }
}

  // -----------------------------------------------------------------------------
	//  BASIC BOARD FUNCTIONS
	// -----------------------------------------------------------------------------

  export function placePentominoRealWorld2Grid(pentomino) {
    // const cellSize = 1.1 / gridSize;
    const worldX = pentomino.position.x;
    const worldY = pentomino.position.y;
    console.log('worldX', worldX, pentomino.position.x, 'worldY', worldY, pentomino.position.y)
    const gridPosition = worldToGridPosition(worldX, worldY);
    console.log('gridPosition - placePentominoRealWorld2Grid', gridPosition)
    placePentomino(pentomino, gridPosition.x, gridPosition.y);
}

export function placePentomino(pentomino, gridX, gridY) {
    let validPosition = isValidPosition(gridX, gridY) ? { x: gridX, y: gridY } : findNearestAvailablePosition(gridX, gridY);

    if (validPosition) {
        const worldPos = gridToWorldPosition(validPosition.x, validPosition.y);

        pentomino.position.x = worldPos.x;
        pentomino.position.y = worldPos.y;
        console.log(cellPlanes[validPosition.x][validPosition.y])
        // pentomino.position.x = cellPlanes[validPosition.x][validPosition.y].position.x;
        // pentomino.position.y = cellPlanes[validPosition.x][validPosition.y].position.y;
        // pentomino.position.z = 0.001;

        pentominosDict[pentomino.name].gridPosition = validPosition;
        
        // Mark the grid as occupied
        console.log('gridPosition - placePentomino -validPosition', validPosition)
        placeInGrid(pentomino, validPosition.x, validPosition.y);

    } else {
        console.log("No valid position found for the pentomino.");

        // THIS IS OVERKILL, BUT TO HELP DEBUG FALL OFF BOARD CONDITIONS
        pentomino.position.x = null;
        pentomino.position.y = null;
        webgameGroup.remove(pentomino);
        $selectedPentominos = $selectedPentominos.filter(letter => letter !== pentomino.name);

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

    // console.log(gridX, gridY);

    while (queue.length > 0) {
        let [x, y] = queue.shift();

        if (isValidPosition(x, y)) {
            // console.log(x, y)
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
