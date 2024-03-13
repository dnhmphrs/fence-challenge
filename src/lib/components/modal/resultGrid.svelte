<script>
import { pFencedTiles, boardOccupiedTiles } from '$lib/store/pentominos.js';
  // Generates an array of grid coordinates
  let grid = [];
  for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
          grid.push({ x: i, y: j });
      }
  }

  // Randomly select two different squares to color
  const randomIndex1 = Math.floor(Math.random() * grid.length);
  let randomIndex2 = Math.floor(Math.random() * grid.length);
  while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * grid.length);
  }

  const coloredSquare1 = grid[randomIndex1];
  const coloredSquare2 = grid[randomIndex2];

  let toColor1Squares = [];
  let toColor2Squares = [];

  $: {
    toColor1Squares = [];
    $pFencedTiles.forEach(array =>{
        toColor1Squares.push((19-array[1])*20+array[0]);
        toColor1Squares.push((19-array[1])*20+array[0]);
    }
    )
  }

  $: {
    let pentTiles = $boardOccupiedTiles;
    toColor2Squares = [];
    for (let i = 0; i<20; i++)
    {
        for (let j = 0; j<20; j++)
        {
            if (pentTiles[i][j] != null)
            {
                toColor2Squares.push((19-j) * 20 + i);
                toColor2Squares.push((19-j) * 20 + i);
            }
        }
    }
  }

</script>

<div class="grid-container">
    {#each grid as {x, y} (x * 20 + y)}
        <div class="cell {toColor1Squares.includes(x * 20 + y) ? 'colored1' : ''} {toColor2Squares.includes(x * 20 + y) ? 'colored2' : ''}"></div>
    {/each}
  </div>
  
<style>
  .grid-container {
      display: grid;

      grid-template-columns: repeat(20, 1fr);
      gap: 2px;
      width: 100%;
      max-width: 460px; /* Adjust based on your needs */
  }

  .cell {
      width: 2.7vmin;
      height: 2.7vmin;
      max-width: 22px;
      max-height: 22px;
      background-color: var(--primary); /* Default cell color */
      aspect-ratio: 1;
  }

  .colored1 {
      background-color: blue; /* First random color */
  }

  .colored2 {
      background-color: green; /* Second random color */
  }
</style>
