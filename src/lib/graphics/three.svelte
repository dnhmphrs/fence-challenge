<script>
	import { onMount } from 'svelte';
	import { pyodideLoaded } from '$lib/store/store';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	import * as THREE from 'three';

	import { processFrame } from '$lib/functions/frameProcessor.js';
	import { testProcessFrame } from '$lib/functions/frameTest.js';
	

	import vertexShader from './shaders/vertexShader-three.glsl';
	import fragmentShader_aufbau from './shaders/fragmentShader-aufbau.glsl';

	let SIDEBAR_SIZE = 0;

	let pyodide;

	let shaderMaterial_aufbau;

	let video, videoTexture;

	let container;

	let camera, scene, renderer;

	let width = window.innerWidth - SIDEBAR_SIZE;
	let height = window.innerHeight;

	let mouse = new THREE.Vector2();
	const clock = new THREE.Clock();

	async function loadPyodidePy() {
			//const pyodide = await loadPyodide({ indexURL: '/pyodide/' });
			pyodide = await loadPyodide();
			await pyodide.runPythonAsync(`
					import sys
					sys.path.append('/python')
			`);
			pyodideLoaded.set(true);
	}

	init();
	animate();

	function startWebcam() {
		video = document.createElement('video');
    video.autoplay = true;
    video.muted = true; // Mute the video
    video.playsInline = true; // Ensure inline play on iOS devices

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            video.srcObject = stream;
            video.play().catch(e => console.error('Error playing the video', e));
        })
        .catch(err => {
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
    if (video.videoWidth && video.videoHeight) {
        let aspectRatio = video.videoWidth / video.videoHeight;

        let plane5Geometry = new THREE.PlaneGeometry(100 * aspectRatio, 100);
        let plane5Material = new THREE.MeshBasicMaterial({ map: videoTexture });
        let plane5 = new THREE.Mesh(plane5Geometry, plane5Material);
        plane5.name = 'plane5'; // Name the plane for identification

        // Create the frame
				let frameMaterial = new THREE.MeshBasicMaterial({ color: 0x232323 }); // Black frame
        let frameThickness = .8; // Adjust thickness to your preference
        let frameGeometry = new THREE.PlaneGeometry(100 * aspectRatio + frameThickness, 100 + frameThickness);
        let frame = new THREE.Mesh(frameGeometry, frameMaterial);
        plane5.position.z = 1; // Position the frame behind the webcam feed

        scene.add(frame);
        scene.add(plane5);
    }
}



	function setupShaderMaterials() {
		const uniformsBase = {
			time: { value: 0 },
			mouse: { value: mouse }
		};

		const colors = {
			color1: new THREE.Color(0xe0e0e0),
			color2: new THREE.Color(0x5099b4 ),
			color3: new THREE.Color(0x8fbd5a),
		}

		shaderMaterial_aufbau = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader_aufbau,
			uniforms: {
				...uniformsBase,
				color1: { value: colors.color1 },
				color2: { value: colors.color2 },
				color3: { value: colors.color3 },
			}
		});

	}

	function updateShaderUniforms() {
		const elapsedTime = clock.getElapsedTime();
		// shaderMaterial_aufbau.uniforms.mouse.value = mouse;
		shaderMaterial_aufbau.uniforms.time.value = elapsedTime;
	}

	function init() {
		camera = new THREE.PerspectiveCamera(20, width / height, 1, 800);
		camera.position.z = 400;

		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x232323);

		startWebcam();
		setupShaderMaterials();
		setScene();

		renderer = new THREE.WebGLRenderer({ antialias: false });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);

		onMount(() => {
			loadPyodidePy();
			container.appendChild(renderer.domElement);
		});

		window.addEventListener('mousemove', onDocumentMouseMove);
		window.addEventListener('resize', onWindowResize);
		// window.addEventListener('navigate', onNavigate);
	}

	function setHome () {
		let plane4 = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), shaderMaterial_aufbau);
		scene.add(plane4);
	}


	function setScene () {
		if ($page.url.pathname == '/') {
			setHome();
		}
	}

	afterNavigate (onNavigate);
	function onNavigate() {

		for( var i = scene.children.length - 1; i >= 0; i--) { 
				let obj = scene.children[i];
				scene.remove(obj); 
		}

		setScene();

	}

	function onWindowResize() {
		let width = window.innerWidth - SIDEBAR_SIZE;
		let height = window.innerHeight;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize(width, height);
	}

	function onDocumentMouseMove(event) {
    var clientX = event.clientX;
    var clientY = event.clientY;

    // mouse.x = (clientX / window.innerWidth) * 2 - 1;
		// mouse.y = -(clientY / window.innerHeight) * 2 + 1;

	};

	function animate() {
		requestAnimationFrame(animate);
		render();
	}

	function render() {
		updateShaderUniforms();
		renderer.render(scene, camera);

		// run pyodide script
		if (pyodideLoaded && video.readyState === video.HAVE_ENOUGH_DATA) {
				testProcessFrame(video, pyodide);
		}
	}
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
