<script>
    import { isTeamOpen } from '$lib/store/store.js';
  
    function closeModal() {
      isTeamOpen.set(false);
    }

  </script>
  
  {#if $isTeamOpen}
  <div class="modal-overlay" on:click={closeModal} on:keydown={closeModal}>
    <div class="modal-content" on:click|stopPropagation on:keydown|stopPropagation>
      <button on:click={closeModal} on:keydown={closeModal}>Close</button>
      <h1> 👩🏾‍🔬 Research Team  </h1>
      <ul class = 'instructions-list'>
        <li>Ana Chávez Cáliz // Universität Heidelberg // artwork & design</li>
        <li>Manuel Estévez // Max Planck Institute & ScaDS.AI // software</li>
        <li>Alfredo Garcia-Collins // ScaDS.AI // software </li>
        <li>Johannes Haefner // ScaDS.AI // software</li>
        <a href="https://danielniels.co.uk"><li>Daniel Humphries // UCL NPP // software</li></a>
        <a href="https://aufbau.io"><li>Aufbau // London // Web Development</li></a>
        <li>Alexis Langlois-R.millard // Universität Bonn // software</li>
        <li>Yaron Maïm // ScaDS.AI// Artwork & Design</li>
        <li>Mia Müßig // Ludwig-Maximilians-Universität München & ScaDS.AI // software </li>
        <li>Miguel O'Malley // Max Planck Institute & ScaDS.AI // software</li>
        <li>Érika Roldán-Roa // Max Planck Institute & ScaDS.AI // group head</li>
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
      padding: 20px;
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
        line-height: 12px;
    }
    @media (max-width: 1024px) {
        ul li, b{font-size: 10px}

        h1 {
          font-size: 20px;
          padding-bottom: 8px;
          margin-bottom: -16px;
        }
        .modal-content {
          max-height: 90%;
          padding: 3px;
        }
    }

  
  </style>