<script>
import { onMount, onDestroy, getContext  } from 'svelte';
import { screenType, pyodideLoaded, isCvMode } from '$lib/store/store';
import * as THREE from 'three';

import Board from './board.svelte';
import { processFrame } from '$lib/functions/pyodide.js';
import { testProcessFrame } from '$lib/functions/frameTest.js';

// -----------------------------------------------------------------------------
// INIT SCENE & CAMERA
// -----------------------------------------------------------------------------

let board;

let video, videoTexture;
let actualVideoWidth, actualVideoHeight;
const cursor = {
  x: 0,
  y: 0,
};

$: buttonText = ($isCvMode) ? 'Process Frame' : 'Upload Result';

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

scene.add(parallaxGroup, nonParallaxGroup);

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
			
			if ( $screenType != 3 )	webcamGroup.position.y = 0.225

      webcamGroup.add(videoPlane);
			nonParallaxGroup.add(webcamGroup);
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
			// board.createPentominos();
	};

	function startCVMode() {
			// Initialize resources for CV mode
			cleanUpCVMode();
			startWebcam();
			if (board) {
				board.cleanUpBoard(); // Ensure to cleanup the other mode
			};
	}

	function startWebgameMode() {
			// Initialize resources for Webgame mode
			cleanUpCVMode(); // Ensure to cleanup the other mode
			if (board) {
				board.cleanUpBoard();
				board.createBoard();
			};

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

<button class="button" on:click={onProcessFrame}><p>{buttonText}</p></button>

<div bind:this={container} class:geometry={true}>
  <Board bind:this={board} {nonParallaxGroup} {screenType} />
</div>

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

	p {
		font-size: 14px;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
</style>