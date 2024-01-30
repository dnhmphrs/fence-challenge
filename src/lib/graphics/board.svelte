<script>
  import { onMount, onDestroy, setContext } from 'svelte';
  import * as THREE from 'three';

  export let nonParallaxGroup;
  export let screenType;

  const webgameGroup = new THREE.Group();

  let pentominosDict = {
		0: {
			letter: 'F',
			width: 3,
			height: 3,
			cornerVertices: [[-1, 0], [-1, 2], [0, 2], [0, 1], [2, 1], [2, 0], [1, 0], [1, -1], [0, -1], [0, 0], [-1, 0], [-1, 0]]
		},
		1: {
			letter: 'I',
			width: 1,
			height: 5,
			cornerVertices: [[0, 3], [1, 3], [1, -2], [0, -2], [0, 3]]
		},
		2: {
			letter: 'L',
			width: 2,
			height: 4,
			cornerVertices: [[-.5, 2.5], [1.5, 2.5], [1.5, 1], [1.5, -1.5], [0.5, -1.5], [0.5, 1.5], [-.5, 1.5], [-.5, 2.5]]
		},
		3: {
			letter: 'N',
			width: 4,
			height: 2,
			cornerVertices: [[-1.5, 0.5], [-0.5,0.5], [-0.5,1.5], [2.5,1.5], [2.5,0.5], [0.5,0.5], [0.5,-0.5], [-1.5,-0.5], [-1.5,0.5]]
		},
		4: {
			letter: 'P',
			width: 3,
			height: 3,
			cornerVertices: [[-1, -1], [-1, 0], [0, 0], [0, 1], [2, 1], [2, -1], [-1, -1]]
		},
		5: {
			letter: 'T',
			width: 3,
			height: 3,
			cornerVertices: [[-1, 2], [2, 2], [2, 1], [1, 1], [1, -1], [0, -1], [0, 1], [-1, 1], [-1, 2]]
		},
		6: {
			letter: 'U',
			width: 3,
			height: 3,
			cornerVertices: [[-1, 1], [0, 1], [0, 0], [1, 0], [1, 1], [2, 1], [2, -1], [-1, -1], [-1, 1]]
		},
		7: {
			letter: 'V',
			width: 3,
			height: 3,
			cornerVertices: [[-1, 2], [0, 2], [0, 0], [1, 0], [2, 0], [2, -1], [-1, -1], [-1, 2]]
		},
		8: {
			letter: 'W',
			width: 3,
			height: 3,
			cornerVertices: [[-1, -1], [-1,1], [0,1], [0,2], [2,2], [2,1], [1,1], [1, 0], [0,0], [0,-1], [-1,-1]]
		},
		9: {
			letter: 'X',
			width: 3,
			height: 3,
			cornerVertices: [[-1, 1], [0,1], [0,2], [1,2], [1,1], [2,1], [2,0], [1,0], [1,-1], [0,-1], [0,0], [-1,0], [-1,1]]
		},
		10: {
			letter: 'Y',
			width: 4,
			height: 2,
			cornerVertices: [[-1.5, 1.5], [2.5, 1.5], [2.5, 0.5], [1.5, 0.5], [1.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-1.5, 0.5], [-1.5, 1.5]]
		},
		11: {
			letter: 'Z',
			width: 3,
			height: 3,
			cornerVertices: [[-1, -1], [-1,1], [1,1], [1,2], [2,2], [2,0], [0,0], [0,-1], [-1,-1]]
		},
	}

  onMount(() => {
    createBoard();
  });

  onDestroy(() => {
    cleanUpBoard();
  });

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

	if ( $screenType != 3 )	webgameGroup.position.y = 0.225

	webgameGroup.add(grid, background);
	nonParallaxGroup.add(webgameGroup);
}

// -----------------------------------------------------------------------------
//  LOAD & RENDER PENTOMINOS
// -----------------------------------------------------------------------------

// for item in /pentonimos/*.png, load the image, create a plane, and add it to the scene
export function createPentominos() {
	const loader = new THREE.TextureLoader();
	const pentominos = [];

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
		($screenType != 3) ? pentominoTile.position.x = Math.random() * .8 - .4 : pentominoTile.position.x = Math.random() * 1.2 - .6;
		($screenType != 3) ? pentominoTile.position.y = Math.random() * 1 - .22 : pentominoTile.position.y = Math.random() * 1 - .5;
		pentominoTile.position.z = Math.random() * 0.1;

		pentominoTile.position.x -= .094;
		pentominoTile.position.y -= .0925;


		pentominos.push(pentominoTile);
	}

	for (let i = 0; i < 12; i++) {
    // nonParallaxGroup.add(pentominos[i]);
    webgameGroup.add(pentominos[i]);
	}

}

export function createBoard() {
  createGrid();
  createPentominos();
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
        webgameGroup.remove(child); // Remove from scene
    });
		nonParallaxGroup.remove(webgameGroup);

    // Remove other webgame-specific elements if they exist
    // For example, pentominos or other objects added to the scene for the webgame mode
}

</script>

<!-- Add any necessary HTML or markup here -->
