<script>
	import { onMount } from 'svelte';
</script>

<div class="sidebar left">
	<h1>FENCE CHALLENGE</h1>
	<p>This is TEXT.</p>
</div>

<div class="sidebar right">
	<!-- <h1>sidebar right</h1>
	<p>This is TEXT.</p> -->
</div>


<style>
	.sidebar {
		width: 320px;
		height: 100%;
		position: fixed;
		top: 0;
		backdrop-filter: blur(10px);
		padding: 20px;
		box-sizing: border-box;
	}

	.sidebar.left {
		border-right: 1px solid var(--primary-50);
		left: 0;
	}

	.sidebar.right {
		border-left: 1px solid var(--primary-50);
		right: 0;
	}
</style>
