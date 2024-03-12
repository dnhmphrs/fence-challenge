<script>
	import { isCvMode, screenType, hideProcess } from '$lib/store/store';
	import PentominoSelection from '../lib/components/pentominoSelection.svelte';
	import QualityButtons from '../lib/graphics/qualityButtons.svelte';
	import {toRotatePentominos, toFlipPentominos, pyodideRan, pIDs} from '$lib/store/pentominos';
	import { leaderboard } from '$lib/store/data';

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

	let leaderBoard = [];
	let leaderboardLength = 0;

	let hideSidebar = false;

	function hideSidebarFunction()
	{
		hideSidebar = !hideSidebar;
		$hideProcess = !$hideProcess
		console.log($hideProcess);
	}

	$: hideSidebarText = hideSidebar ? 'Show' : 'Hide';

	$: order = ($pyodideRan) ? 'Order: '+ $pIDs : 'Order: None';

	$: cameraModeText = ($screenType != 3) ? 'Camera' : 'Camera Mode';

	$: gameModeText = ($screenType != 3) ? 'Game' : 'Game Mode';

	$: {
		if ($pyodideRan){
			leaderboardLength = Math.min($leaderboard.length, 30);
			leaderBoard = $leaderboard;
			console.log($leaderboard);
		}
	}

	//$: leaderboardLength = ($pyodideRan) ? Math.max($leaderboard.length, 30) : 0;
	
</script>

<div class="sidebar left">
	<div class="title">
		<h1>FENCE CHALLENGE</h1>
		<p>Enclose as much area as you can with some (or all) of the pentominos!</p>
	</div>
	<!-- <hr style="border: .5px solid var(--primary-50);" /> -->
	<div class="leaderboard-title">
		<h2>Leaderboard</h2>
		<h4>{order}</h4>
	</div>
	<div class="leaderboard no-scrollbar">
		{#each Array(leaderboardLength) as _, i}
			<div class="leaderboard-entry">
				<p class="leaderboard-entry-name">{$leaderboard[i].playerID}</p>
				<p class="leaderboard-entry-country">{$leaderboard[i].country}</p>
				<p class="leaderboard-entry-score">{$leaderboard[i].area}</p>
			</div>
		{/each}
	</div>
</div>

<div class="sidebar right" class:hidden={hideSidebar} >
	<div class="button holder">
		{#if $screenType !=3}
			<button class="width-33" on:click={() => hideSidebarFunction()} on:keydown={() => hideSidebarFunction()}>{hideSidebarText}</button>
		{/if}
		<button on:click={() => toggleCvMode()} on:keydown={() => toggleCvMode()}>
			<p class='modeButton'>
				<span class:hidden={!$isCvMode}>{cameraModeText}</span>
				<span>//</span>
				<span class:hidden={$isCvMode}>{gameModeText}</span>
			</p>
		</button>
		<button on:click={() => rotateEvent()} on:keydown = {() => rotateEvent()}>{'Rotate'}</button>
		<button on:click={() => flipEvent()} on:keydown = {() => flipEvent()}>{'Flip'}</button>
	</div>
	{#if !$isCvMode}
		<div class="pentominos">
			<PentominoSelection />
		</div>
	{/if}
	{#if $isCvMode && ($screenType !=3)}
		<div class = "pentominos">
			<QualityButtons />
		</div>
	{/if}

</div>


<style>
	.sidebar {
		height: 100%;
		position: fixed;
		top: 0;
		padding: 20px;
		box-sizing: border-box;

		display: flex;
		flex-flow: column nowrap;
		gap: 15px;
	}

	.sidebar.left {
		width: 280px;
		/* border-right: 1px solid var(--dark-purple); */
		background: none;
		backdrop-filter: none;
		left: 0;
		z-index: 1000;
	}


	h1 {
		font-size: 18px;
	}

	.title {
		border: 3px double var(--dark-purple);
		background: var(--background);
		padding: 15px;
		border-radius: 10px;

		display: flex;
		text-align: center;
		justify-content: center;
		flex-flow: column nowrap;
		gap: 10px;
	}

	.leaderboard-title {
		display: flex;
		background: var(--background);
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
		height: 100%;
	}

	.leaderboard-entry {
		background: var(--background);
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

	.button.holder {
		display: flex;
		flex-flow: column nowrap;
		gap: 1vmin;
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
			height: 0;
			top: -100%;
			gap: 10px;
			border-left: none;
			border-bottom: 1px solid #000000;
		}

		.sidebar.right {
			width: 100%;
			margin-top: 5px;
			margin-bottom: 5px;
			height: 30%;
			top: 62%;
			bottom: 15%;
			gap: 5px;
			border-right: none;
			border-top: 1px solid #000000;
		}

		.sidebar.right button {
			margin-bottom: 5px;
		}

		.sidebar.right.hidden {
			top: calc(100% - 75px);

		}

		.button.holder {
			max-width: 100%;
			display: inline-flex;
			flex-flow: row nowrap;
			justify-content: center;
			width: 100%;
			padding: 0 0px;
			gap: .5vmin;
		}

		.width-33 {
			width: 33%;
		}

	}
</style>
