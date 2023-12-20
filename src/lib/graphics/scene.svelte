<script>
import { onMount, onDestroy } from 'svelte';
import { screenType, pyodideLoaded } from '$lib/store/store';
import * as THREE from 'three';

import { processFrame } from '$lib/functions/frameProcessor.js';
import { testProcessFrame } from '$lib/functions/frameTest.js';

// -----------------------------------------------------------------------------
// INIT SCENE & CAMERA
// -----------------------------------------------------------------------------

let TMP = 0;
let pyodide;
let video, videoTexture;
const cursor = {
  x: 0,
  y: 0,
};


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
			cornerVertices: [[0, 1], [1,1], [0,1]]
		},
		4: {
			letter: 'P',
			width: 3,
			height: 3,
			cornerVertices: [[0, 2], [2, 2], [2, 1], [1, 1], [1, 0], [0, 0]]
		},
		5: {
			letter: 'T',
			width: 3,
			height: 3,
			cornerVertices: [[0, 2], [3, 2], [3, 1], [2, 1], [2, 0], [1, 0], [1, 1], [0, 1]]
		},
		6: {
			letter: 'U',
			width: 3,
			height: 3,
			cornerVertices: [[0, 2], [3, 2], [3, 0], [2, 0], [2, 1], [1, 1], [1, 0], [0, 0]]
		},
		7: {
			letter: 'V',
			width: 3,
			height: 3,
			cornerVertices: [[0, 2], [1, 2], [1, 0], [3, 0], [3, -1], [0, -1]]
		},
		8: {
			letter: 'W',
			width: 3,
			height: 3,
			cornerVertices: [[0, 2], [1, 2], [1, 1], [2, 1], [2, 0], [3, 0], [3, -1], [0, -1]]
		},
		9: {
			letter: 'X',
			width: 3,
			height: 3,
			cornerVertices: [[0, 2], [2, 2], [2, 1], [3, 1], [3, 0], [2, 0], [2, -1], [0, -1], [0, 0], [1, 0], [1, 2]]
		},
		10: {
			letter: 'Y',
			width: 4,
			height: 2,
			cornerVertices: [[0, 1], [3, 1], [3, 0], [4, 0], [4, -1], [1, -1], [1, 0], [0, 0]]
		},
		11: {
			letter: 'Z',
			width: 3,
			height: 3,
			cornerVertices: [[0, 2], [1, 2], [1, 1], [3, 1], [3, 0], [2, 0], [2, 1], [0, 1]]
		},
	}


let container, id;
	onDestroy(() => cancelAnimationFrame(id));

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0x232323, 1);

const scene = new THREE.Scene();

onMount(() => {
    loadPyodidePy();
		container.appendChild(renderer.domElement);
	});

const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.5,
    15
);

if ($screenType == 1) {
  camera.position.set(0, 0, 4);
} else {
  camera.position.set(0, 0, 2.5);
}

camera.lookAt(0, 0, 0);

const parallaxGroup = new THREE.Group();
const nonParallaxGroup = new THREE.Group();

scene.add(parallaxGroup);
scene.add(nonParallaxGroup);

// -----------------------------------------------------------------------------
//  LOAD PYODIDE
// -----------------------------------------------------------------------------

async function loadPyodidePy() {
		//const pyodide = await loadPyodide({ indexURL: '/pyodide/' });
		pyodide = await loadPyodide();
		await pyodide.runPythonAsync(`
					import sys
					sys.path.append('/python')
			`);
		pyodideLoaded.set(true);
	}

// -----------------------------------------------------------------------------
//  CREATE WEBCAM ELEMENT & VIDEO TEXTURE
// -----------------------------------------------------------------------------

function startWebcam() {
		video = document.createElement('video');
		video.autoplay = true;
		video.muted = true; // Mute the video
		video.playsInline = true; // Ensure inline play on iOS devices

		navigator.mediaDevices
			.getUserMedia({ video: { facingMode: 'environment' } })
			.then((stream) => {
				video.srcObject = stream;
				video.play().catch((e) => console.error('Error playing the video', e));
			})
			.catch((err) => {
				console.error('Error accessing the webcam', err);
			});

		videoTexture = new THREE.VideoTexture(video);
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;
		videoTexture.format = THREE.RGBAFormat;

		video.addEventListener('playing', () => {
			// This event is triggered when the video starts playing
			updatePlaneGeometry();
		});
	}

  function updatePlaneGeometry() {
    let SIZE = 1;

		if (video.videoWidth && video.videoHeight) {
			let aspectRatio = video.videoWidth / video.videoHeight;

			let videoPlaneGeometry = new THREE.PlaneGeometry(SIZE * aspectRatio, SIZE);
			let videoPlaneMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
			videoPlaneMaterial.transparent = true;
			videoPlaneMaterial.opacity = .5;
			let videoPlane = new THREE.Mesh(videoPlaneGeometry, videoPlaneMaterial);

			// create Background behnd video
			let bgMaterial = new THREE.MeshBasicMaterial({ color: 0x232323 }); // Black frame
			let bgGeometry = new THREE.PlaneGeometry(
				SIZE * aspectRatio,
				SIZE
			);
			let bg = new THREE.Mesh(bgGeometry, bgMaterial);
			bg.position.z = -0.00001; // Position the frame behind the webcam feed	

			// Create the frame
			let frameMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black frame
			let frameThickness = 0.002; // Adjust thickness to your preference
			let frameGeometry = new THREE.PlaneGeometry(
				SIZE * aspectRatio + frameThickness,
				SIZE + frameThickness
			);
			let frame = new THREE.Mesh(frameGeometry, frameMaterial);
			frame.position.z = -0.00002; // Position the frame behind the webcam feed


      nonParallaxGroup.add(videoPlane, bg, frame);
		}
	}

// -----------------------------------------------------------------------------
//  LOAD & RENDER PENTOMINOS
// -----------------------------------------------------------------------------

function createGrid() {
	const grid = new THREE.GridHelper(1.25, 20, 0x000000, 0x000000);
	grid.rotateX(Math.PI / 2);
	grid.position.z = 0.001;
	grid.material.opacity = 1;
	grid.material.transparent = true;
	nonParallaxGroup.add(grid);
}

// for item in /pentonimos/*.png, load the image, create a plane, and add it to the scene
function createPentominos() {
	const loader = new THREE.TextureLoader();
	const pentominos = [];

	// transparent plane, visible image

	for (let i = 3; i < 4; i++) {
		let pentominoTile = new THREE.Group();

		const texture = loader.load(`/pentominos/${pentominosDict[i].letter}.png`);
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
		plane.position.z = 0.001;
		plane.name = `pentomino${i}`;

		// create frame around pentomino using lineGeometry and pentomino.shape (which defines the 5 cell x,y coords)
		// create points for line
		let points = [];
		for (let j = 0; j < pentominosDict[i].cornerVertices.length; j++) {
			console.log(pentominosDict[i].cornerVertices[j])
			let x = (pentominosDict[i].cornerVertices[j][0] - 0.5) * scale;
			let y = (pentominosDict[i].cornerVertices[j][1] - 0.5) * scale;
			points.push(new THREE.Vector3(x, y, 0.001));
		}
		const lineMaterial = new THREE.LineBasicMaterial({color: 0xFFFBE6});
		const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
		const frame = new THREE.Line( lineGeometry, lineMaterial );
		frame.position.z = 0.001;
		// frame.scale.x = scale;
		// frame.scale.y = scale;
		// frame.rotateX(Math.PI / 2);
		// frame.rotateY(Math.PI / 2);


		pentominoTile.add(plane, frame);
		// pentominoTile.position.x = Math.random() * 1 - .5;
		// pentominoTile.position.y = Math.random() * 1 - .5;

		pentominoTile.position.x -= .094;
		pentominoTile.position.y -= .0925;
		pentominoTile.position.z = 0.001;

		pentominos.push(pentominoTile);
	}

	for (let i = 0; i < 12; i++) {
		nonParallaxGroup.add(pentominos[i]);
	}


}

// -----------------------------------------------------------------------------
// CREATE BACKGROUND SCENE ELEMENTS
// -----------------------------------------------------------------------------

function createStars() {

  const particlesCount = 400;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xFFFBE6,
    size: 0.02,
  });

  const stars = new THREE.Points(particlesGeometry, particlesMaterial);
  parallaxGroup.add(stars);
}

// -----------------------------------------------------------------------------
// START SCENE & ANIMATE
// -----------------------------------------------------------------------------

createStars();
createGrid();
createPentominos();
startWebcam();
id = window.requestAnimationFrame(render);

function render() {
    // Parallax effect
    parallaxGroup.position.x += (-cursor.x - parallaxGroup.position.x * 1) * .02;
    parallaxGroup.position.y += (cursor.y - parallaxGroup.position.y * 1) * .02;

    // Camera always looks at the center of the scene
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    id = window.requestAnimationFrame(render);

    // run pyodide script
		if (pyodideLoaded && video.readyState === video.HAVE_ENOUGH_DATA && TMP == 100) {
			processFrame(video, pyodide);
		}
		TMP += 1;
}


// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
});

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

</script>

<div bind:this={container} class:geometry={true} />

<style>
	.geometry {
		position: absolute;
		right: 0;
		overflow: hidden;
		z-index: -1;
	}
</style>