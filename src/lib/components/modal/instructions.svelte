<script>
    import { isInstructionsOpen } from '$lib/store/store.js';
  
    function closeModal() {
      isInstructionsOpen.set(false);
    }

  </script>
  
  {#if $isInstructionsOpen}
  <div class="modal-overlay" on:click={closeModal} on:keydown={closeModal}>
    <div class="modal-content" on:click|stopPropagation on:keydown|stopPropagation>
      <button on:click={closeModal} on:keydown={closeModal}>Close</button>
      <h1> 🏡 Fence Challenge </h1>
      <ul class = 'instructions-list'>
      <li>The goal of this game is to enclose <b>as much area as possible</b> in a fence with the given pentominos.</li>
      <li>Build your fence, then hit the <b>Detect Fence</b> or <b>Process Frame</b> button to analyze the result!</li>

        <li>For camera mode, use the pentominos with aruco markers to assemble a fence, then take a picture with the corner markers in frame near the edges and the pentomino markers
        as clear as possible.</li>
        
        <li>Try to keep your hand steady for a good experience! <b>Can you top the leaderboard?</b></li>
        
        <li>If you want to keep track of your scores, save your <b>player_ID</b> and enter it in the <b>player_ID box</b> for future submissions. </li>
        </ul>
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
      padding: 32px;
      border-radius: 5px;
      z-index: 10;
  
      width: 90%;
      height: auto;
      max-width: 600px;
      max-height: 800px;
      
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      gap: 10px;
    }
    h1 {
      font-size: 32px;
      padding-top: 10px;
    }
    ul{
        margin: 0;
        display: flex;
        flex-flow: column nowrap;
        gap: 20px;
        padding: 20px;
        overflow: auto;
    }
    li
    {
        line-height: 20px;
        text-align: justify;
    }
    @media (max-width: 1024px) {
        ul li, b{font-size: 10px}

        h1 {
          font-size: 20px;
        }
        .modal-content {
          max-height: 90%;
          padding: 20px;
        }
    }

  
  </style>