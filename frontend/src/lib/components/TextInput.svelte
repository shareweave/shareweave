<script lang="ts">
	export let name;
	export let placeholder;
	export let label;
</script>

<p class="my-1">
	<label class="mb-1 block text-sm" for={name}>{label}</label>
	<input class="block rounded-xl  border-2 border-black p-3" {name} type="text" {placeholder} />
</p>
