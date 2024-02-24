<script>
	import { selectedPentominos } from '$lib/store/pentominos';
</script>

<div class="grid">
  <div class="pentomino F" 
    class:selected={$selectedPentominos.includes('F')} 
    on:click={() => $selectedPentominos.includes('F') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'F') : $selectedPentominos = [...$selectedPentominos, 'F']}
    on:keypress={() => $selectedPentominos.includes('F') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'F') : $selectedPentominos = [...$selectedPentominos, 'F']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="pentomino I"
    class:selected={$selectedPentominos.includes('I')} 
    on:click={() => $selectedPentominos.includes('I') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'I') : $selectedPentominos = [...$selectedPentominos, 'I']}
    on:keypress={() => $selectedPentominos.includes('I') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'I') : $selectedPentominos = [...$selectedPentominos, 'I']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="pentomino L"
    class:selected={$selectedPentominos.includes('L')} 
    on:click={() => $selectedPentominos.includes('L') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'L') : $selectedPentominos = [...$selectedPentominos, 'L']}
    on:keypress={() => $selectedPentominos.includes('L') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'L') : $selectedPentominos = [...$selectedPentominos, 'L']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  
  <div class="pentomino N"
  class:selected={$selectedPentominos.includes('N')} 
  on:click={() => $selectedPentominos.includes('N') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'N') : $selectedPentominos = [...$selectedPentominos, 'N']}
  on:keypress={() => $selectedPentominos.includes('N') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'N') : $selectedPentominos = [...$selectedPentominos, 'N']}
  >
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
</div>

<div class="pentomino P"
class:selected={$selectedPentominos.includes('P')} 
on:click={() => $selectedPentominos.includes('P') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'P') : $selectedPentominos = [...$selectedPentominos, 'P']}
on:keypress={() => $selectedPentominos.includes('P') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'P') : $selectedPentominos = [...$selectedPentominos, 'P']}
>
<div class="cell"></div>
<div class="cell"></div>
<div class="cell"></div>
<div class="cell"></div>
<div class="cell"></div>
</div>

  <div class="pentomino T"
    class:selected={$selectedPentominos.includes('T')} 
    on:click={() => $selectedPentominos.includes('T') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'T') : $selectedPentominos = [...$selectedPentominos, 'T']}
    on:keypress={() => $selectedPentominos.includes('T') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'T') : $selectedPentominos = [...$selectedPentominos, 'T']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="pentomino U"
    class:selected={$selectedPentominos.includes('U')} 
    on:click={() => $selectedPentominos.includes('U') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'U') : $selectedPentominos = [...$selectedPentominos, 'U']}
    on:keypress={() => $selectedPentominos.includes('U') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'U') : $selectedPentominos = [...$selectedPentominos, 'U']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="pentomino V"
    class:selected={$selectedPentominos.includes('V')} 
    on:click={() => $selectedPentominos.includes('V') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'V') : $selectedPentominos = [...$selectedPentominos, 'V']}
    on:keypress={() => $selectedPentominos.includes('V') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'V') : $selectedPentominos = [...$selectedPentominos, 'V']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="pentomino W"
    class:selected={$selectedPentominos.includes('W')} 
    on:click={() => $selectedPentominos.includes('W') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'W') : $selectedPentominos = [...$selectedPentominos, 'W']}
    on:keypress={() => $selectedPentominos.includes('W') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'W') : $selectedPentominos = [...$selectedPentominos, 'W']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="pentomino X"
    class:selected={$selectedPentominos.includes('X')} 
    on:click={() => $selectedPentominos.includes('X') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'X') : $selectedPentominos = [...$selectedPentominos, 'X']}
    on:keypress={() => $selectedPentominos.includes('X') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'X') : $selectedPentominos = [...$selectedPentominos, 'X']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="pentomino Y"
    class:selected={$selectedPentominos.includes('Y')} 
    on:click={() => $selectedPentominos.includes('Y') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'Y') : $selectedPentominos = [...$selectedPentominos, 'Y']}
    on:keypress={() => $selectedPentominos.includes('Y') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'Y') : $selectedPentominos = [...$selectedPentominos, 'Y']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="pentomino Z"
    class:selected={$selectedPentominos.includes('Z')} 
    on:click={() => $selectedPentominos.includes('Z') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'Z') : $selectedPentominos = [...$selectedPentominos, 'Z']}
    on:keypress={() => $selectedPentominos.includes('Z') ? $selectedPentominos = $selectedPentominos.filter(p => p !== 'Z') : $selectedPentominos = [...$selectedPentominos, 'Z']}
    >
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

</div>

<style>
  .grid {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px 8px;
    width: 100%;
    height: 100%;
  }

  .cell {
    width: 100%;
    height: 100%;
    background-color: #444;
  }


  /* Define classes for each pentomino shape */
  .pentomino {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 3px;
    width: 48%;
    height: 15%;
    padding: 8px;

    cursor: pointer;
    border-radius: 10px;
    border: 3px double var(--primary-50);
  }

  .pentomino:hover {
    border-color: var(--dark-purple);
  }

  .pentomino:active,
  .pentomino.selected:active {
    border-color: var(--primary);
  }

  /* stay dark after click release */
  .pentomino.selected {
    border-color: var(--primary);
  }

  .pentomino:hover .cell::after {
    background-color: var(--dark-purple);
  }

  .pentomino:active .cell,
  .pentomino.selected:active .cell {
    background-color: var(--primary);
  }

  .pentomino.selected {
    border-color: var(--primary);
  }

  .pentomino.selected .cell {
    background-color: var(--primary);
  }

  .pentomino.selected:active .cell {
    background-color: #444;
  }

  .pentomino.selected:active {
    border-color: var(--primary-50);
  }

  @media (max-width: 1024px) {
    .grid {
      flex-flow: row wrap;
      gap: 10px 5px;
    }

    .pentomino {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      width: 15%;
      height: 45%;
    }
  }

  /* Adjust the starting positions for each pentomino */
.pentomino.I { grid-column-start: 1; grid-row-start: 1; }
.pentomino.L { grid-column-start: 6; grid-row-start: 1; }
.pentomino.N { grid-column-start: 1; grid-row-start: 11; }
.pentomino.P { grid-column-start: 6; grid-row-start: 6; }
.pentomino.T { grid-column-start: 1; grid-row-start: 6; }
.pentomino.U { grid-column-start: 6; grid-row-start: 11; }
.pentomino.V { grid-column-start: 11; grid-row-start: 11; }
.pentomino.W { grid-column-start: 1; grid-row-start: 16; }
.pentomino.X { grid-column-start: 6; grid-row-start: 16; }
.pentomino.Y { grid-column-start: 11; grid-row-start: 16; }
.pentomino.Z { grid-column-start: 11; grid-row-start: 6; }

  /* Pentomino F */
.pentomino.F .cell:nth-child(1) { grid-column: 2; grid-row: 2; }
.pentomino.F .cell:nth-child(2) { grid-column: 2; grid-row: 1; }
.pentomino.F .cell:nth-child(3) { grid-column: 3; grid-row: 1; }
.pentomino.F .cell:nth-child(4) { grid-column: 1; grid-row: 2; }
.pentomino.F .cell:nth-child(5) { grid-column: 2; grid-row: 3; }

  /* Pentomino I */
.pentomino.I .cell:nth-child(1) { grid-column: 1; grid-row: 3; }
.pentomino.I .cell:nth-child(2) { grid-column: 1; grid-row: 1; }
.pentomino.I .cell:nth-child(3) { grid-column: 1; grid-row: 2; }
.pentomino.I .cell:nth-child(4) { grid-column: 1; grid-row: 4; }
.pentomino.I .cell:nth-child(5) { grid-column: 1; grid-row: 5; }

/* Pentomino L */
.pentomino.L .cell:nth-child(1) { grid-column: 1; grid-row: 3; }
.pentomino.L .cell:nth-child(2) { grid-column: 1; grid-row: 1; }
.pentomino.L .cell:nth-child(3) { grid-column: 1; grid-row: 2; }
.pentomino.L .cell:nth-child(4) { grid-column: 1; grid-row: 4; }
.pentomino.L .cell:nth-child(5) { grid-column: 2; grid-row: 4; }

/* Pentomino T */
.pentomino.T .cell:nth-child(1) { grid-column: 2; grid-row: 1; }
.pentomino.T .cell:nth-child(2) { grid-column: 1; grid-row: 1; }
.pentomino.T .cell:nth-child(3) { grid-column: 3; grid-row: 1; }
.pentomino.T .cell:nth-child(4) { grid-column: 2; grid-row: 2; }
.pentomino.T .cell:nth-child(5) { grid-column: 2; grid-row: 3; }

/* Pentomino P */
.pentomino.P .cell:nth-child(1) { grid-column: 1; grid-row: 2; }
.pentomino.P .cell:nth-child(2) { grid-column: 1; grid-row: 1; }
.pentomino.P .cell:nth-child(3) { grid-column: 2; grid-row: 2; }
.pentomino.P .cell:nth-child(4) { grid-column: 2; grid-row: 1; }
.pentomino.P .cell:nth-child(5) { grid-column: 1; grid-row: 3; }

/* Pentomino N */
.pentomino.N .cell:nth-child(1) { grid-column: 1; grid-row: 2; }
.pentomino.N .cell:nth-child(2) { grid-column: 2; grid-row: 1; }
.pentomino.N .cell:nth-child(3) { grid-column: 2; grid-row: 2; }
.pentomino.N .cell:nth-child(4) { grid-column: 1; grid-row: 3; }
.pentomino.N .cell:nth-child(5) { grid-column: 1; grid-row: 4; }

/* Pentomino U */
.pentomino.U .cell:nth-child(1) { grid-column: 2; grid-row: 2; }
.pentomino.U .cell:nth-child(2) { grid-column: 1; grid-row: 1; }
.pentomino.U .cell:nth-child(3) { grid-column: 1; grid-row: 2; }
.pentomino.U .cell:nth-child(4) { grid-column: 3; grid-row: 2; }
.pentomino.U .cell:nth-child(5) { grid-column: 3; grid-row: 1; }

/* Pentomino V */
.pentomino.V .cell:nth-child(1) { grid-column: 1; grid-row: 3; }
.pentomino.V .cell:nth-child(2) { grid-column: 1; grid-row: 1; }
.pentomino.V .cell:nth-child(3) { grid-column: 1; grid-row: 2; }
.pentomino.V .cell:nth-child(4) { grid-column: 2; grid-row: 3; }
.pentomino.V .cell:nth-child(5) { grid-column: 3; grid-row: 3; }

/* Pentomino W */
.pentomino.W .cell:nth-child(1) { grid-column: 2; grid-row: 2; }
.pentomino.W .cell:nth-child(2) { grid-column: 1; grid-row: 1; }
.pentomino.W .cell:nth-child(3) { grid-column: 1; grid-row: 2; }
.pentomino.W .cell:nth-child(4) { grid-column: 2; grid-row: 3; }
.pentomino.W .cell:nth-child(5) { grid-column: 3; grid-row: 3; }

/* Pentomino X */
.pentomino.X .cell:nth-child(1) { grid-column: 2; grid-row: 2; }
.pentomino.X .cell:nth-child(2) { grid-column: 1; grid-row: 2; }
.pentomino.X .cell:nth-child(3) { grid-column: 2; grid-row: 1; }
.pentomino.X .cell:nth-child(4) { grid-column: 3; grid-row: 2; }
.pentomino.X .cell:nth-child(5) { grid-column: 2; grid-row: 3; }

/* Pentomino Y */
.pentomino.Y .cell:nth-child(1) { grid-column: 2; grid-row: 2; }
.pentomino.Y .cell:nth-child(2) { grid-column: 1; grid-row: 2; }
.pentomino.Y .cell:nth-child(3) { grid-column: 2; grid-row: 1; }
.pentomino.Y .cell:nth-child(4) { grid-column: 2; grid-row: 3; }
.pentomino.Y .cell:nth-child(5) { grid-column: 2; grid-row: 4; }

/* Pentomino Z */
.pentomino.Z .cell:nth-child(1) { grid-column: 2; grid-row: 2; }
.pentomino.Z .cell:nth-child(2) { grid-column: 1; grid-row: 1; }
.pentomino.Z .cell:nth-child(3) { grid-column: 2; grid-row: 1; }
.pentomino.Z .cell:nth-child(4) { grid-column: 2; grid-row: 3; }
.pentomino.Z .cell:nth-child(5) { grid-column: 3; grid-row: 3; }

</style>