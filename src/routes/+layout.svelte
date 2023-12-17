<script>
	import './app.css';

	import { onMount } from 'svelte';
	import { screenType, isIframe } from '$lib/store/store';
	import { page } from '$app/stores';

	let Geometry;

	onMount(async () => {
		const module = await import('$lib/graphics/three.svelte');
		Geometry = module.default;

		function getDeviceType() {
			const width =
				window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			console.log($page.url.pathname);

			if (
				'ontouchstart' in window ||
				navigator.maxTouchPoints > 0 ||
				navigator.msMaxTouchPoints > 0
			) {
				// This is a device which supports touch
				if (width <= 767) {
					// Mobile
					return 1;
				} else {
					// Tablet
					return 2;
				}
			} else {
				// This is likely a laptop or desktop
				return 3;
			}
		}

		screenType.set(getDeviceType());
		isIframe.set(window.location !== window.parent.location);
	});
</script>

<svelte:head>
	<title>MPI MiS // PENTOMINOES</title>
	<meta name="description" content="PENTOMINOES GAME" />

	<link
		rel="preload"
		href="/fonts/NB-Architekt-Pro-Light.woff"
		as="font"
		type="font/woff"
		crossorigin="anonymous"
	/>

	<link
		rel="preload"
		href="/fonts/NB-Architekt-Pro-Bold.woff"
		as="font"
		type="font/woff"
		crossorigin="anonymous"
	/>
</svelte:head>

<svelte:component this={Geometry} />

{#if $screenType}
	<body>
		<slot />
	</body>
{/if}

<style>
	body {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100dvh;
	}
</style>
