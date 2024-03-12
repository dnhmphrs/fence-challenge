<script>
    import { isLeaderboardOpen } from '$lib/store/store.js';
    import { leaderboard } from '$lib/store/data';
    import { pIDs, pyodideRan } from '$lib/store/pentominos.js';

  
    function closeLeaderboard() {
      isLeaderboardOpen.set(false);
    }

    let leaderBoard = [];
	let leaderboardLength = 0;

	$: order = ($pyodideRan) ? 'Order: '+ $pIDs : 'Order: None';

	$: {
		if ($pyodideRan){
			leaderboardLength = Math.min($leaderboard.length, 10);
			leaderBoard = $leaderboard;
			console.log($leaderboard);
		}
	}

  // Function to convert country codes to flag emoji
  function countryCodeToFlagEmoji(countryCode) {
    // Check if the countryCode is "NONE" and return an appropriate response
    if (countryCode.toUpperCase() === "NONE") {
        return ""; // Return an empty string or a placeholder text like "No Country"
    }
    
    return countryCode.toUpperCase().replace(/./g, char => 
        String.fromCodePoint(127397 + char.charCodeAt()));
}
</script>
  
  {#if $isLeaderboardOpen}
  <div class="modal-overlay" on:click={closeLeaderboard} on:keydown={closeLeaderboard}>
    <div class="modal-content" on:click|stopPropagation on:keydown|stopPropagation>
      <button on:click={closeLeaderboard} on:keydown={closeLeaderboard}>Close</button>
      <div class="modal-inner">
            <div class="leaderboard-title">
                <h2>🏅 Leaderboard</h2>
                <h1>{order}</h1>
            </div>
            <div class="leaderboard no-scrollbar">
                {#each Array(leaderboardLength) as _, i}
                    <div class="leaderboard-entry">
                        <p class="leaderboard-entry-name">{$leaderboard[i].playerID}</p>
                        <p class="leaderboard-entry-country">{countryCodeToFlagEmoji($leaderboard[i].country)}</p>
                        <p class="leaderboard-entry-score">{$leaderboard[i].area}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
  </div>
  {/if}
  
  <style>
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--background-50);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000; /* Ensure it's above other content */
    }
  
    .modal-content {
      background: var(--background);
      border: double 3px var(--dark-purple);
      padding: 20px;
      border-radius: 5px;
      z-index: 10;
  
      width: 90%;
      height: 80%;
      max-width: 600px;
      max-height: 800px;
  
      display: flex;
    flex-flow: column nowrap;
    gap: 20px;
    overflow: auto;
    }
  
    .modal-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      display: flex;
      flex-flow: column nowrap;
      gap: 20px;
    }
  
    .leaderboard-title {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		border: 3px double var(--dark-purple);
		
		padding: 10px;
		border-radius: 10px;

    width: 100%;
	}

    .leaderboard {
		display: flex;
		flex-flow: column nowrap;
		gap: 10px;
		overflow: auto;

		border: 3px double var(--dark-purple);
		padding: 10px;
		border-radius: 10px;

    width: 100%;
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
  
  /*
    .name-input {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  
    .letter-selector {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .letter-selector button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      margin: 0;
    }
  
    .letter-selector span {
      display: block;
      padding: 4px;
      font-size: 20px;
      font-weight: bold;
    }
    */

    
  @media (max-width: 1024px) {

        .modal-content {
          height: 90%;
        }
      }
  </style>