<script lang="ts">
	export let name;
	export let placeholder;
	export let label;
	export let type = 'text';
</script>

<p class="my-1 text-left">
	<label class="text-sm mb-1 block" for={name}>{label}</label>
	<input
		class="text-black block p-3  border-black border-2 rounded-xl"
		{name}
		{type}
		{placeholder}
	/>
</p>
