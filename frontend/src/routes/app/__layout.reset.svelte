<script>
	import AppHeader from '@components/AppHeader.svelte';
	import NavBar from '@components/NavBar.svelte';
</script>

<div class="grid grid-cols-[18rem_1fr] grid-rows-[3rem_1fr]">
	<NavBar />
	<AppHeader />
	<main class="m-4 font-sans">
		<slot />
	</main>
</div>

<style>
	@import url('../typography.css');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
