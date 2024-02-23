<script>
	import { isCvMode, screenType } from '$lib/store/store';
	import PentominoSelection from '../lib/components/pentominoSelection.svelte';
	import {toRotatePentominos, toFlipPentominos} from '$lib/store/pentominos';

	function rotateEvent()
	{
		$toRotatePentominos += 1;
		console.log($toRotatePentominos);
	}

	function flipEvent()
	{
		$toFlipPentominos += 1;
		console.log($toFlipPentominos);
	}

	let toggleCvMode = () => {
		isCvMode.update(value => !value);
	};

	let hideSidebar = false;
	$: hideSidebarText = hideSidebar ? 'Show' : 'Hide';
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

<div class="sidebar right" class:hidden={hideSidebar} >
	<div class="button holder">
		{#if $screenType !=3}
			<button class="width-33" on:click={() => hideSidebar = !hideSidebar} on:keydown={() => hideSidebar = !hideSidebar}>{hideSidebarText}</button>
		{/if}
		<button on:click={() => toggleCvMode()} on:keydown={() => toggleCvMode()}>
			<p>
				<span class:hidden={!$isCvMode}>Camera Mode</span>
				<span>//</span>
				<span class:hidden={$isCvMode}>Game Mode</span>
			</p>
		</button>
		<button on:click={() => rotateEvent()} on:keydown = {() => rotateEvent()}>{'Rotate'}</button>
		<button on:click={() => flipEvent()} on:keydown = {() => flipEvent()}>{'Flip'}</button>
	</div>
	<div class="pentominos">
		<PentominoSelection />
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
		border: 3px double var(--dark-purple);
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
		border: 3px double var(--dark-purple);
		
		padding: 10px;
		border-radius: 10px;
	}

	h2 {
		font-family: var(--font-body);
		font-size: 16px;
	}

	h4 {
		/* font-family: var(--font-body); */
		font-size: 16px;
	}

	.leaderboard {
		display: flex;
		flex-flow: column nowrap;
		gap: 10px;
		overflow: auto;

		border: 3px double var(--dark-purple);
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
		width: 300px;
		/* border-left: 1px solid var(--dark-purple); */
		right: 0;
	}

	button, button p {
		display: flex;
		width: 100%;
		justify-content: space-around;
	}

	.sidebar.right button h4 span {
		font-size: 14px;

	}

	.pentominos {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}


	span.hidden {
		opacity: .5;
	}

	@media (max-width: 1024px) {
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

		.sidebar.right button {
			margin-bottom: 5px;
		}

		.sidebar.right.hidden {
			top: calc(100% - 80px);

		}

		.button.holder {
			max-width: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			width: 100%;
			padding: 0 0px;
			gap: 20px;
		}

		.width-33 {
			width: 33%;
		}

	}
</style>
