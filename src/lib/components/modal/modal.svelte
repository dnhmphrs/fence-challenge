<script>
  import { isModalOpen } from '$lib/store/store.js';
  import ResultGrid from '$lib/components/modal/ResultGrid.svelte';

  function closeModal() {
    isModalOpen.set(false);
  }

  // Create a store for each letter in the name
  let nameLetters = Array.from({ length: 6 }, () => 'A');

  // Function to change a letter up or down in the alphabet
  function changeLetter(index, direction) {
    let currentIndex = alphabet.indexOf(nameLetters[index]);
    let nextIndex = (currentIndex + direction + 26) % 26;
    nameLetters[index] = alphabet[nextIndex];
  }
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
    border: solid 2px var(--primary);
    font-weight: 900;
    font-size: 16px;
  }

  button.primary:hover {
    background: var(--primary);
    color: var(--background);
  }
</style>