<script>
	import './styles.css';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';

	import { onMount } from 'svelte';
	import { screenType, isIframe, screenSize, appReady, isCvMode, pyodideLoaded, isInstructionsOpen } from '$lib/store/store';
	import { getDeviceType, getScreenSize } from '$lib/functions/utils';
	import { handleLoadPyodide } from '$lib/functions/pyodide.js';

	import Modal from '$lib/components/modal/modal.svelte';
	import Leaderboard from '$lib/components/modal/leaderboard.svelte';
	import Instructions from '$lib/components/modal/instructions.svelte';
	import Team from '$lib/components/modal/team.svelte';

	export let data;
	let Geometry;
	let geometryLoaded = false;

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}

	$: {
		if($appReady)
			{
				//$isInstructionsOpen = true;
			}
		}

	function handleScreen() {
		// screen size
		screenSize.set(getScreenSize());

		// device type
		screenType.set(getDeviceType());
		isIframe.set(window.location !== window.parent.location);
	} 

	function setUpApp(bool) {
			isCvMode.set(bool);
			appReady.set(true);
			document.querySelector('main').style.opacity = 1;
		}

	onMount(async () => {
		// webgl
		const module = await import('$lib/graphics/scene.svelte');
    Geometry = module.default;
		// set timeout
		setTimeout(() => {
			geometryLoaded = true;
		}, 1000);

		handleScreen();
		window.addEventListener('resize', () => handleScreen());

		// load pyodide
		await handleLoadPyodide().then(() => {
			pyodideLoaded.set(true);
		});

		return () => {
			window.removeEventListener('resize', () => handleScreen());
		};
	});
</script>

<svelte:head>
	<title>Fence Challenge</title>
	<meta name="description" content="Fence Challenge project for International Mathematics Day. From the MPI MiS With love. ❤️" />
	<meta name="keywords" content="" />
	<meta name="author" content="AUFBAU" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="preload" href="/fence-example.png" as="image" />
</svelte:head>

{#if $appReady }
	<svelte:component this={Geometry} />
{:else if $pyodideLoaded}
<div class="loading">
 <button on:click={() => setUpApp(true)}>📸 start app using camera</button>
 <button on:click={() => setUpApp(false)}>🕹️ start app in game mode</button>
</div>
{:else if geometryLoaded}
	<div class="loading">loading python and initialising.</div>
{:else}
	<div class="loading">loading app.</div>
{/if}

<!-- <button style="position:absolute;left:20%;z-index:100;" on:click={() => isModalOpen.set(true)}>Open Modal</button> -->
<div class="app">

	<Instructions />
	<Team />
	<Modal />
	<Leaderboard />

	<main>
		<slot />
	</main>

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100dvh;
		width: 100%;
		overflow: hidden;
	}

	.loading {
		position: absolute;
		display: flex;
		flex-flow: column;
		align-items: center;
		text-align: center;
		gap: 20px;
		/* font-style: italic;
		font-family: serif; */
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 10px;
		font-size: 14px;
		z-index: 10;
	}

	.loading button {
		cursor: pointer;
		font-size: 14px;
	}

	.loading button:hover {
		/* background: var(--dark-purple);
		color: var(--primary); */
		border-color: var(--primary);
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		width: 100%;
		height: 100%;
		opacity: 0; /* hide until loaded */
		transition: opacity 0.5s 0.5s ease-in-out;
		overflow: hidden;
		position: fixed;
	}

	

</style>
