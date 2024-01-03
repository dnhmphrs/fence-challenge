<script>
	import './styles.css';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';

	import { onMount } from 'svelte';
	import { screenType, isIframe, screenSize, pyodideLoaded } from '$lib/store/store';
	import { getDeviceType, getScreenSize } from '$lib/functions/utils';
	import { handleLoadPyodide } from '$lib/functions/pyodide.js';

	export let data;
	let Geometry;

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}

	function handleScreen() {
		// screen size
		screenSize.set(getScreenSize());

		// device type
		screenType.set(getDeviceType());
		isIframe.set(window.location !== window.parent.location);
	} 


	onMount(async () => {
		// webgl
		const module = await import('$lib/graphics/scene.svelte');
    Geometry = module.default;

		handleScreen();
		window.addEventListener('resize', () => handleScreen());


		// load pyodide
		await handleLoadPyodide().then(() => {
			pyodideLoaded.set(true);
			document.querySelector('main').style.opacity = 1;
		});

		return () => {
			window.removeEventListener('resize', () => handleScreen());
		};
	});
</script>

<svelte:head>
	<title>Fence Challenge</title>
	<meta name="description" content="WIP" />
	<meta name="keywords" content="" />
	<meta name="author" content="AUFBAU" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

{#if $pyodideLoaded}
    <svelte:component this={Geometry} />
{:else}
    <div class="loading">loading.</div>
{/if}

<div class="app">

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
		font-style: italic;
		font-family: serif;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 10px;
		font-size: 12px;
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
	}

</style>
