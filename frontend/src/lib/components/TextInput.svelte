<script lang="ts">
	export let name;
	export let placeholder;
	export let label;
</script>

<p class="my-1">
	<label class="text-sm mb-1 block" for={name}>{label}</label>
	<input class="block p-3  border-black border-2 rounded-xl" {name} type="text" {placeholder} />
</p>
