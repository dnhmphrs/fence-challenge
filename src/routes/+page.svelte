<script>
	import { onMount } from 'svelte';
</script>

<div class="sidebar left">
	<h1>FENCE CHALLENGE</h1>
	<p>This is TEXT.</p>
</div>

<div class="sidebar right">
</div>


<style>
	.sidebar {
		height: 100%;
		position: fixed;
		top: 0;
		backdrop-filter: blur(10px);
		padding: 20px;
		box-sizing: border-box;
	}

	.sidebar.left {
		width: 280px;
		border-right: 1px solid #000000;
		left: 0;
	}

	.sidebar.right {
		width: 280px;
		border-left: 1px solid #000000;
		right: 0;
	}

	@media (max-width: 1024px) {
		.sidebar.left {
			width: 100%;
			height: 20%;
			top: 0;
			border-left: none;
			border-bottom: 1px solid #000000;
		}
		.sidebar.right {
			width: 100%;
			height: 20%;
			top: 80%;
			border-right: none;
			border-top: 1px solid #000000;
		}
	}
</style>
