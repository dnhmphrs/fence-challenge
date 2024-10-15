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
      <h1> Project Head  </h1>
      <ul>
        <li><a href = "https://erikaroldan.net">Érika Roldán-Roa // Max Planck Institute & ScaDS.AI</a></li>
      </ul>
      <h1> Web Development </h1>
      <ul>
        <li>Alfredo Garcia-Collins // ScaDS.AI</li>
        <li><a href = "https://aufbau.io">Daniel Humphries // UCL NPP</a></li>
        <li>Miguel O'Malley // Max Planck Institute & ScaDS.AI</li>
      </ul>
      <h1> Computational Technology </h1>
      <ul>
        <li>Manuel Estévez // Max Planck Institute & ScaDS.AI</li>
        <li>Johannes Haefner // ScaDS.AI</li>
        <li>Alexis Langlois-R.millard // Universität Bonn</li>
        <li>Mia Müßig // Ludwig-Maximilians-Universität München & ScaDS.AI</li>
      </ul>
      <h1> Art & Design</h1>
      <ul>
        <li>Ana Chávez Cáliz // Universität Heidelberg</li>
        <li>Yaron Maïm // ScaDS.AI </li>
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
      max-width: fit-content;
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
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        gap: 20px;
        padding: 20px 20px;
        overflow: auto;
        align-items: center;
    }
    li
    {
        line-height: 12px;
        text-align: justify;
        width: 100%;
    }
    a
    {
      font-size: 14px;
      line-height: 12px;
      text-align: justify;
      width: 100%;
    }
    @media (max-width: 768px) {
        ul li, b, a{
          font-size: 10px;
        }

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