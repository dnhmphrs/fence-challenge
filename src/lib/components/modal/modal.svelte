<script>
  import { isCvMode } from '$lib/store/store';
</script>

<!-- modal -->
<div class="modal" class:hidden={!$isCvMode}>
  <div class="modal-content">
    <div class="modal-header">
      <h2>Camera Mode</h2>
      <span class="close" on:click={() => isCvMode.update(value => !value)} on:keydown={() => isCvMode.update(value => !value)}>&times;</span>
    </div>
    <div class="modal-body">
      <p>Use the camera to play the game.</p>
    </div>
    <div class="modal-footer">
      <button on:click={() => isCvMode.update(value => !value)}>Close</button>
    </div>
  </div>

</div>

<style>
  /* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }

  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-header {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
  }

  .modal-body {padding: 2px 16px;}

  .modal-footer {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
  }
</style>