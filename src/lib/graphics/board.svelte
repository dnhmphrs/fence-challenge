<script>
  import { onMount, onDestroy, setContext } from 'svelte';
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
		}
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
		pentominoTile.position.z = Math.random() * 0.1;

		pentominoTile.position.x -= .094;
		pentominoTile.position.y -= .0925;


		pentominos.push(pentominoTile);
	}
}

export function createBoard() {
  createGrid();
	
	for (let i = 0; i < 12; i++) {
    // nonParallaxGroup.add(pentominos[i]);
    webgameGroup.add(pentominos[i]);
	}
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
