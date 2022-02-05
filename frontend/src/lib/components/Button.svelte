<script lang="ts">
	export let primary = false;
	export let danger = false;
	export let fullWidth = false;
</script>

<button
	on:click
	class="my-2 mr-4 p-2 px-5 border-2 rounded-md text-white border-brand"
	class:w-full={fullWidth}
	class:hover:bg-brand-light={primary}
	class:bg-brand={primary}
	class:bg-red={danger}
	class:border-red={danger}
	class:text-brand={!primary && !danger}
	class:hover:bg-background-darker={!primary && !danger}
	class:hover:opacity-80={danger}><slot /></button
>
