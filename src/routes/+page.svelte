<script>
	import { cvMode, screenType } from '$lib/store/store';

	let toggleCvMode = () => {
		cvMode.update(value => !value);
	};
</script>

<div class="sidebar left">
	<div class="title">
		<h1>FENCE CHALLENGE</h1>
		<p>This is a short piece of text that will maybe be a description of sorts.</p>
	</div>
	<!-- <hr style="border: .5px solid var(--primary-50);" /> -->
	<div class="leaderboard-title">
		<h2>Leaderboard</h2>
		<h4>ORDER: FILNPTUVWXYZ</h4>
	</div>
	<div class="leaderboard no-scrollbar">
		{#each Array(30) as _, i}
			<div class="leaderboard-entry">
				<p class="leaderboard-entry-name">Player {i}</p>
				<p class="leaderboard-entry-country">Germany</p>
				<p class="leaderboard-entry-score">{Math.floor((Math.random() * 128))}</p>
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
	<div class="pentominos">
		<!-- {#if ( $screenType == 3 && window.innerWidth > 800 )}
		<img src="tmp4.png" alt="tmp"/>
		{:else}
		<img src="tmp4-rotated.png" alt="tmp"/>
		{/if} -->
	</div>

</div>


<style>
	.sidebar {
		height: 100%;
		position: fixed;
		top: 0;
		backdrop-filter: blur(10px);
		background: var(--background);
		padding: 20px;
		box-sizing: border-box;

		display: flex;
		flex-flow: column nowrap;
		gap: 20px;
	}

	.sidebar.left {
		width: 280px;
		/* border-right: 1px solid var(--dark-purple); */
		left: 0;
	}


	h1 {
		font-size: 20px;
	}

	.title {
		border: 1px solid var(--dark-purple);
		padding: 10px;
		border-radius: 10px;

		display: flex;
		text-align: center;
		justify-content: center;
		flex-flow: column nowrap;
		gap: 10px;
	}

	.leaderboard-title {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		border: 1px  solid var(--dark-purple);
		
		padding: 10px;
		border-radius: 10px;
	}

	h2 {
		font-size: 20px;
	}

	h4 {
		font-size: 11.75px;
	}

	.leaderboard {
		display: flex;
		flex-flow: column nowrap;
		gap: 10px;
		overflow: auto;

		border: 1px  solid var(--dark-purple);
		padding: 10px;
		border-radius: 10px;
	}

	.leaderboard-entry {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		gap: 20px;
	}

	.leaderboard-entry-name {
 		width: 40%;
	}

	.leaderboard-entry-country {
 		width: 30%;
	}

	.leaderboard-entry-score {
 		width: 10%;
		text-align: right;
	}

	.sidebar.right {
		width: 280px;
		/* border-left: 1px solid var(--dark-purple); */
		right: 0;
	}

	.sidebar.right button h4, .sidebar.right button h4 span {
		font-size: 12px;
	}


	.pentominos {
		width: 100%;
		height: 100%;

		border: 1px  solid var(--dark-purple);
		padding: 10px;
		border-radius: 10px;
	}


	.hidden {
		opacity: .5;
	}

	@media (max-width: 800px) {
		.sidebar.left {
			max-height: 0;
			overflow: hidden;
			opacity: 0;
		}
		.sidebar.left {
			width: 100%;
			height: 10%;
			top: 0;
			gap: 10px;
			border-left: none;
			border-bottom: 1px solid #000000;
		}
		.sidebar.right {
			width: 100%;
			height: 30%;
			top: 70%;
			gap: 10px;
			border-right: none;
			border-top: 1px solid #000000;
		}
	}
</style>
