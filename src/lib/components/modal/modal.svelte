<script>
  import { isModalOpen } from '$lib/store/store.js';
  import {pArea, pFencedTiles, pIDs, pyodideRan} from '$lib/store/pentominos.js';
  import ResultGrid from '$lib/components/modal/resultGrid.svelte';

  function closeModal() {
    isModalOpen.set(false);
  }

  $ :{
    console.log($pArea);
    console.log($pFencedTiles);
    console.log($pIDs);
  }

  $: area = {$pyodideRan} ? {$pArea} : '0';
  $: order = {$pyodideRan} ? {$pIDs} : '';

  // Create a store for each letter in the name
  let nameLetters = Array.from({ length: 6 }, () => 'A');

  // Function to change a letter up or down in the alphabet
  function changeLetter(index, direction) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let currentIndex = alphabet.indexOf(nameLetters[index]);
    let nextIndex = (currentIndex + direction + 26) % 26;
    nameLetters[index] = alphabet[nextIndex];
  }
</script>

{#if $isModalOpen}
<div class="modal-overlay" on:click={closeModal} on:keydown={closeModal}>
  <div class="modal-content" on:click|stopPropagation on:keydown|stopPropagation>
    <button on:click={closeModal} on:keydown={closeModal}>Close</button>
    <div class="modal-inner">
      <div class="input-row">
        <h1>order: {order}</h1>
        <h1>AREA: {area}</h1>
      </div>
      <ResultGrid />
    <div class="input-row">

      <div>
        <h1>name: </h1>
 
   
      </div>
      
      <div class="name-input">
        {#each nameLetters as letter, index (index)}
          <div class="letter-selector">
            <button on:click={() => changeLetter(index, -1)}>▲</button>
            <span>{letter}</span>
            <button on:click={() => changeLetter(index, 1)}>▼</button>
          </div>
        {/each}
      </div>
    </div>
    
    <button class="primary">submit score to leaderboard</button>
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

    width: 80%;
    height: 80%;
    max-width: 600px;
    max-height: 800px;


  }

  .modal-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .input-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
  }

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

  button.primary {
    border: double 3px var(--primary);
    font-weight: 900;
    font-size: 16px;
  }

  button.primary:hover {
    background: var(--primary);
    color: var(--background);
  }
</style>