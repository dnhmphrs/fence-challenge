<script>
	import { onMount } from 'svelte';
</script>

<div class="sidebar left">
	<div class="title">
		<h1>FENCE CHALLENGE</h1>
		<p>This is a short piece of text that will maybe be a description of sorts.</p>
	</div>
	<hr>
	<div class="leaderboard">
		<h2>Leaderboard</h2>
		{#each Array(30) as _, i}
			<div class="leaderboard-entry">
				<p class="leaderboard-entry-name">Player {i}</p>
				<p class="leaderboard-entry-name">Germany</p>
				<p class="leaderboard-entry-score">{i * 100}</p>
			</div>
		{/each}
	</div>
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

		display: flex;
		flex-flow: column nowrap;
		gap: 20px;
	}

	.title {
		display: flex;
		flex-flow: column nowrap;
		gap: 10px;
	}

	.leaderboard {
		display: flex;
		flex-flow: column nowrap;
		gap: 10px;
	}

	.leaderboard-entry {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
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
