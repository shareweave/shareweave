<script lang="ts">
	export let options: string[];
	export let name: string;
	export let selected: number = 0;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

{#each options as option, id}
	<span>
		<input
			class="selector hidden"
			on:select={() => dispatch('change', id)}
			checked={id === selected}
			type="radio"
			id={id.toString()}
			{name}
		/>
		<label class="mx-1 rounded-3xl p-2 px-3" for={id.toString()}>{option}</label>
	</span>
{/each}

<style>
	input.selector:checked ~ label {
		@apply bg-background-darker;
	}
</style>
