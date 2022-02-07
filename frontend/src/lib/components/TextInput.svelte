<svelte:options tag={'shareweave-text-input'} />

<script lang="ts">
	export let name;
	export let placeholder;
	export let label;
	export let type = 'text';
</script>

<p class="my-1 text-left">
	<label class="mb-1 block text-sm" for={name}>{label}</label>
	<input
		class="block rounded-xl border-2  border-black p-3 text-black"
		{name}
		{type}
		{placeholder}
	/>
</p>
