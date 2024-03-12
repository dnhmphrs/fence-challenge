<script>
import { qualityMode } from '$lib/store/store';

function setQualityMode(qInt)
{
    $qualityMode = qInt;
}

</script>

<div class="midbar">
	<div class="button holder">
        <button on:click={() => setQualityMode(0)} on:keydown = {() => setQualityMode(0)}>{'High'}</button>
		<button on:click={() => setQualityMode(1)} on:keydown = {() => setQualityMode(1)}>{'Medium'}</button>
		<button on:click={() => setQualityMode(2)} on:keydown = {() => setQualityMode(2)}>{'Low'}</button>
	</div>
</div>


<style>

.midbar {
			width: 100%;
			margin-top: 5px;
			margin-bottom: 5px;
			height: 30%;
			top: 62%;
			bottom: 15%;
			gap: 5px;
			border-right: none;
			border-top: 1px solid #000000;
		}

button, button p {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.sidebar.right button h4 span {
    font-size: 14px;

}

.button.holder {
			max-width: 100%;
			display: inline-flex;
			flex-flow: row nowrap;
			justify-content: center;
			width: 100%;
			padding: 0 0px;
			gap: .5vmin;
		}

</style>