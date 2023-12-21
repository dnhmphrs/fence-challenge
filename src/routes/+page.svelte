<script>
	import { cvMode } from '$lib/store/store';

	let toggleCvMode = () => {
		cvMode.update(value => !value);
	};
</script>

<div class="sidebar left">
	<div class="title">
		<h1>FENCE CHALLENGE</h1>
		<p>This is a short piece of text that will maybe be a description of sorts.</p>
	</div>
	<hr style="border: .5px solid var(--primary-50);" />
	<h2>Leaderboard</h2>
	<div class="leaderboard no-scrollbar">
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
	<button  on:click={() => toggleCvMode()} on:keydown={() => toggleCvMode()}>
		<h4>
			<span class:hidden={!$cvMode}>Camera Mode</span>
			//
			<span class:hidden={$cvMode}>Game Mode</span>
		</h4>
</button>
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
		border-right: .5px solid var(--primary-50);
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
		overflow: auto;
	}

	.leaderboard-entry {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}

	.sidebar.right {
		width: 280px;
		border-left: .5px solid var(--primary-50);
		right: 0;
	}

	.sidebar.right button, .sidebar.right h4 {
		font-size: 12px;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}


	.hidden {
		opacity: .5;
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
