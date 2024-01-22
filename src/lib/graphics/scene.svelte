<script>
import { onMount, onDestroy } from 'svelte';
import { screenType, pyodideLoaded, isCvMode } from '$lib/store/store';
import * as THREE from 'three';

import { processFrame } from '$lib/functions/pyodide.js';
import { testProcessFrame } from '$lib/functions/frameTest.js';

// -----------------------------------------------------------------------------
// INIT SCENE & CAMERA
// -----------------------------------------------------------------------------

let pyodide;
let video, videoTexture;
let actualVideoWidth, actualVideoHeight;
const cursor = {
  x: 0,
  y: 0,
};


$: buttonText = ($isCvMode) ? 'Process Frame' : 'Upload Result';

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


let container, id;
	onDestroy(() => cancelAnimationFrame(id));

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0x232323, 1);

const scene = new THREE.Scene();

onMount(() => {
    // loadPyodidePy();
		container.appendChild(renderer.domElement);
		// make .geometry class opacity 1
		setTimeout(() => {
			document.querySelector('.geometry').style.opacity = 1;
			document.querySelector('button').style.opacity = 1;
		}, 500);

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
const webcamGroup = new THREE.Group();
const webgameGroup = new THREE.Group();

scene.add(parallaxGroup, nonParallaxGroup);

// -----------------------------------------------------------------------------
//  LOAD PYODIDE
// -----------------------------------------------------------------------------

// async function loadPyodidePy() {
// 		pyodide = await loadPyodide();
// 		await pyodide.runPythonAsync(`
// 					import sys
// 					sys.path.append('/python')
// 			`);
// 		pyodideLoaded.set(true);
// 	}

// -----------------------------------------------------------------------------
//  CREATE WEBCAM ELEMENT & VIDEO TEXTURE
// -----------------------------------------------------------------------------

function startWebcam() {
		video = document.createElement('video');
		video.autoplay = true;
		video.muted = true; // Mute the video
		video.playsInline = true; // Ensure inline play on iOS devices

		navigator.mediaDevices.getUserMedia({ video: { 
			facingMode: 'environment',
			width: ($screenType == 3) ? { ideal: 1920 } : { ideal: 720 }, // Smaller width for mobile
      height: ($screenType == 3) ? { ideal: 1080 } : { ideal: 1280 }  // Smaller height for mobile
		}}).then((stream) => {
            video.srcObject = stream;
            video.play().catch((e) => console.error('Error playing the video', e));

            video.addEventListener('loadedmetadata', () => {
                // Extract video dimensions once the metadata is loaded
                const videoTrack = stream.getTracks()[0];
                const settings = videoTrack.getSettings();
                actualVideoWidth = settings.width;
                actualVideoHeight = settings.height;

								console.log(actualVideoWidth, actualVideoHeight)
                
                // Additional setup can be done here if needed
                // setupVideoTexture();
            });
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

		if (actualVideoWidth && actualVideoHeight) {
			let aspectRatio = actualVideoWidth / actualVideoHeight;

			let videoPlaneGeometry = new THREE.PlaneGeometry(SIZE * aspectRatio, SIZE);
			let videoPlaneMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
			videoPlaneMaterial.transparent = true;
			videoPlaneMaterial.opacity = .75;
			let videoPlane = new THREE.Mesh(videoPlaneGeometry, videoPlaneMaterial);

			// // create Background behind video
			// let bgMaterial = new THREE.MeshBasicMaterial({ color: 0x232323 }); // Black frame
			// let bgGeometry = new THREE.PlaneGeometry(
			// 	SIZE * aspectRatio,
			// 	SIZE
			// );
			// let bg = new THREE.Mesh(bgGeometry, bgMaterial);
			// bg.position.z = -0.0000; // Position the frame behind the webcam feed	

			// // Create the frame
			// let frameMaterial = new THREE.MeshBasicMaterial({ color: 0x0b0b0b }); // Black frame
			// let frameThickness = 0.002; // Adjust thickness to your preference
			// let frameGeometry = new THREE.PlaneGeometry(
			// 	SIZE * aspectRatio + frameThickness + frameThickness,
			// 	SIZE + frameThickness
			// );
			// let frame = new THREE.Mesh(frameGeometry, frameMaterial);
			// frame.position.z = -0.00002; // Position the frame behind the webcam feed
			
			if ( $screenType != 3 )	webcamGroup.position.y = 0.225

      webcamGroup.add(videoPlane);
			nonParallaxGroup.add(webcamGroup);
		}
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

	if ( $screenType != 3 )	webgameGroup.position.y = 0.225

	webgameGroup.add(grid, background);
	nonParallaxGroup.add(webgameGroup);
}

// -----------------------------------------------------------------------------
//  LOAD & RENDER PENTOMINOS
// -----------------------------------------------------------------------------

// for item in /pentonimos/*.png, load the image, create a plane, and add it to the scene
function createPentominos() {
	const loader = new THREE.TextureLoader();
	const pentominos = [];

	// transparent plane, visible image

	for (let i = 0; i < 12; i++) {
		let pentominoTile = new THREE.Group();

		const texture = loader.load(`/pentominos-blank/${pentominosDict[i].letter}.png`);
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

		// create frame around pentomino using lineGeometry and pentomino.shape (which defines the 5 cell x,y coords)
		// create points for line
		let points = [];
		for (let j = 0; j < pentominosDict[i].cornerVertices.length; j++) {
			// console.log(pentominosDict[i].cornerVertices[j])
			let x = (pentominosDict[i].cornerVertices[j][0] - 0.5) * scale;
			let y = (pentominosDict[i].cornerVertices[j][1] - 0.5) * scale;
			points.push(new THREE.Vector3(x, y, 0.001));
		}
		const lineMaterial = new THREE.LineBasicMaterial({color: 0x232323});
		const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
		const frame = new THREE.Line( lineGeometry, lineMaterial );
		frame.position.z = 0.002;
		// frame.scale.x = scale;
		// frame.scale.y = scale;
		// frame.rotateX(Math.PI / 2);
		// frame.rotateY(Math.PI / 2);


		pentominoTile.add(plane); //, frame);
		($screenType != 3) ? pentominoTile.position.x = Math.random() * .8 - .4 : pentominoTile.position.x = Math.random() * 1.2 - .6;
		($screenType != 3) ? pentominoTile.position.y = Math.random() * 1 - .22 : pentominoTile.position.y = Math.random() * 1 - .5;
		pentominoTile.position.z = Math.random() * 0.1;

		pentominoTile.position.x -= .094;
		pentominoTile.position.y -= .0925;


		pentominos.push(pentominoTile);
	}

	for (let i = 0; i < 12; i++) {
		nonParallaxGroup.add(pentominos[i]);
	}


}

// -----------------------------------------------------------------------------
// CREATE STARS
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
    size: 0.01,
  });

  const stars = new THREE.Points(particlesGeometry, particlesMaterial);
  parallaxGroup.add(stars);
}

// -----------------------------------------------------------------------------
// START SCENE & HANDLE MODE CHANGES
// -----------------------------------------------------------------------------

	basicSetup();
	// Reactive statement to handle mode changes
	$: {
			if ($isCvMode) {
					startCVMode();
			} else {
					startWebgameMode();
			}
	}

	function basicSetup() {
			createStars();
			createPentominos();
	};

	function startCVMode() {
			// Initialize resources for CV mode
			cleanUpCVMode();
			startWebcam();
			cleanUpWebgameMode(); // Ensure to cleanup the other mode
	}

	function startWebgameMode() {
			// Initialize resources for Webgame mode
			cleanUpWebgameMode();
			createGrid();
			cleanUpCVMode(); // Ensure to cleanup the other mode
	}

	function cleanUpCVMode() {
    // Stop the video stream
    if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }

    // Remove video texture if exists
    if (videoTexture) {
        videoTexture.dispose();
        videoTexture = null;
    }

    // Remove video plane and related elements from the scene
    webcamGroup.children.forEach(child => {
        if (child.material) {
            child.material.dispose(); // Dispose material
        }
        if (child.geometry) {
            child.geometry.dispose(); // Dispose geometry
        }
        webcamGroup.remove(child); // Remove from scene
    });

    // Perform additional clean-up if necessary
		nonParallaxGroup.remove(webcamGroup);
}


function cleanUpWebgameMode() {
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

id = window.requestAnimationFrame(render);

// -----------------------------------------------------------------------------
// ANIMATE
// -----------------------------------------------------------------------------


function render() {
    // Parallax effect
    parallaxGroup.position.x += (-cursor.x - parallaxGroup.position.x * 1) * .02;
    parallaxGroup.position.y += (cursor.y - parallaxGroup.position.y * 1) * .02;

    // Camera always looks at the center of the scene
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    id = window.requestAnimationFrame(render);
}

function onProcessFrame() {
	    // run pyodide script
		if (pyodideLoaded && video.readyState === video.HAVE_ENOUGH_DATA) {
			processFrame(video, actualVideoWidth, actualVideoHeight);
		} else {
			console.log('not ready')
			alert('not ready')
		}
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

<button class="button" on:click={onProcessFrame}><h4>{buttonText}</h4></button>

<div bind:this={container} class:geometry={true} />

<style>
	.geometry {
	position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  display: block; /* Removes potential extra space below the canvas */
  padding: 0;
  margin: 0;
  border: none;
  z-index: -1;

  /* animations */
  opacity: 0; /* start invisible */
  transition: opacity 0.5s ease-in-out;
	}

	button {
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translate(-50%, 0);
		z-index: 100;

		/* animations */
		opacity: 0; /* start invisible */
 		transition: opacity 0.5s ease-in-out;
	}

	h4 {
		font-size: 12px;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
</style>