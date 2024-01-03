<script>
	 export let data;
	 console.log(data);
</script>

<img src="/aufbau.svg" alt="aufbau logo" width="76" height="20" />
<ul>
	{#each data.experiment as experiment}
		<li>{experiment}</li>
	{/each}
</ul>

<style>
	img {
		object-fit: contain;
	}
</style>

