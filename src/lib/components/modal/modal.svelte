<script>
  import { isModalOpen } from '$lib/store/store.js';
  import {pArea, pFencedTiles, pIDs} from '$lib/store/pentominos.js';
  import {pentominosKey} from '$lib/graphics/pentominos.js';
  
  function closeModal() {
    isModalOpen.set(false);
  }

  $ :{
    console.log($pyodideSays);
    let areaText = $pArea;
    document.getElementById('areaText').textContent = 'Area: ' + areaText;
    let ids = $pIDs;
    let idString = '';
    for (let i = 0; i < ids.length; i++)
    {
      idString += pentominosKey[Number(ids[i])];
    }
    document.getElementById('fenceID').textContent = 'Area: ' + areaText;
  }
</script>

{#if $isModalOpen}
<div class="modal-overlay" on:click={closeModal} on:keydown={closeModal}>
  <div class="modal-content" on:click|stopPropagation>
    <slot />
    <button on:click={closeModal}>Close</button>
    <h2 id = 'areaText'>No fence yet...</h2>
    <p id = 'fenceID'></p>
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
    backdrop-filter: blur(5px);
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
    max-width: 700px;
    max-height: 600px;
  }

</style>