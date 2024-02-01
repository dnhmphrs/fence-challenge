<script>
import { onMount, onDestroy, getContext  } from 'svelte';
import { screenType, pyodideLoaded, isCvMode } from '$lib/store/store';
import { selectedPentominos } from '$lib/store/pentominos.js';
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
let cursor = new THREE.Vector2();

$: buttonText = ($isCvMode) ? 'Process Frame' : 'Upload Result';

let container, id;

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let SELECTED = null; // Currently selected object
const RAYCASTER = new THREE.Raycaster(); // Raycaster for mouse interaction
const INTERSECTS = new THREE.Vector3(); // Point of intersection
let PLANE; // Invisible plane for raycasting
let OFFSET = new THREE.Vector3(); // Offset between object and intersection point

// -----------------------------------------------------------------------------
//  BASIC SETUP
// -----------------------------------------------------------------------------

const renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0x232323, 1);

const scene = new THREE.Scene();

function createInvisiblePlane() {
  PLANE = new THREE.Plane();
  PLANE.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0));
  nonParallaxGroup.add(PLANE);
}


onMount(() => {
    // loadPyodidePy();
    createInvisiblePlane();
    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    
		// make .geometry class opacity 1
		setTimeout(() => {
			document.querySelector('.geometry').style.opacity = 1;
			document.querySelector('button').style.opacity = 1;
		}, 500);
	});

onDestroy(() => {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mousedown', onDocumentMouseDown, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  cancelAnimationFrame(id)
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

// let aspectRatio = window.innerWidth / window.innerHeight;
// let camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, 1, -1, 0.1, 100);
// camera.position.set(0, 0, 10); // Adjust based on your scene
// camera.lookAt(0, 0, 0);

const parallaxGroup = new THREE.Group();
const nonParallaxGroup = new THREE.Group();
const webcamGroup = new THREE.Group();

scene.add(parallaxGroup, nonParallaxGroup);

// -----------------------------------------------------------------------------
//  INTERACTION WATCHERS
// -----------------------------------------------------------------------------

function updateCursor(event) {
  cursor.x = (event.clientX / sizes.width) * 2 - 1;
  cursor.y = -(event.clientY / sizes.height) * 2 + 1;
  // console.log('cursor:', cursor);
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    updateCursor(event);

    // console.log('PLANE:', PLANE);
    RAYCASTER.setFromCamera(cursor, camera);

    if (SELECTED) {
      RAYCASTER.setFromCamera(cursor, camera);
      if (RAYCASTER.ray.intersectPlane(PLANE, INTERSECTS)) {
        // account for board scale
        SELECTED.position.copy(INTERSECTS.sub(OFFSET));
        SELECTED.position.z = 0.1;
      }
    }

    // Additional logic for highlighting or hovering can go here
  }

  function onDocumentMouseDown(event) {
    event.preventDefault();

    RAYCASTER.setFromCamera(cursor, camera);
    let intersects = RAYCASTER.intersectObjects(board.getPentominos()); // Assume getPentominos returns all clickable objects

    // console.log('Raycaster origin:', RAYCASTER.ray.origin);
    // console.log('Raycaster direction:', RAYCASTER.ray.direction);
    // console.log('Intersects:', intersects);
    // console.log('INTERSECTS:', INTERSECTS);
    // console.log('PLANE:', PLANE);
    // console.log('cursor:', cursor);
  
    if (intersects.length > 0) {
      // console.log(intersects)
      // console.log(intersects[0].object.position)

      // fixes null selectio bug
      if ($selectedPentominos.includes(intersects[0].object.name)) {
        console.log('selected pentomino:', intersects[0].object.name)
        SELECTED = intersects[0].object;
        if (RAYCASTER.ray.intersectPlane(PLANE, INTERSECTS)) {
          OFFSET.copy(INTERSECTS).sub(SELECTED.position);
        }

        // Logic for indicating selection, e.g., changing material color, scale, etc.
      
        SELECTED.scale.set(1.1, 1.1, 1.1); // make object scale * 1.1
        // make object appear on top of other objects
        SELECTED.position.z = 0.1;
      }


    }    
  }

  function onDocumentMouseUp(event) {
    event.preventDefault();

    if (SELECTED) {
      // Reset selection visuals or perform additional checks
      SELECTED.scale.set(1, 1, 1); // reset scale
      SELECTED.position.z = 0.001; // reset z position
      // call placePentomino function
      board.placePentominoRealWorld2Grid(SELECTED); 
      SELECTED = null;
    }
  }

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
			if ($isCvMode) {
				updatePlaneGeometry();
			};
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
			
			if ( $screenType == 1 )	webcamGroup.position.y = 0.225

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
			if (board) {
				board.cleanUpBoard();
				board.createBoard();
			}
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
      if (!$isCvMode) {alert('Python not connected yet')};

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

// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = event.clientY / sizes.height - 0.5;
// });

</script>

<button class="button" on:click={onProcessFrame}><p>{buttonText}</p></button>

<div bind:this={container} class:geometry={true}>
  <Board bind:this={board} {nonParallaxGroup} {screenType} gameMode={!$isCvMode} />
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