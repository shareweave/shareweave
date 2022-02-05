<script>
	import AppHeader from '@components/AppHeader.svelte';

	import NavBar from '@components/NavBar.svelte';
	import Modal from 'svelte-simple-modal';
</script>

<Modal>
	<div class="grid grid-cols-[18rem_1fr] grid-rows-[3rem_1fr]">
		<NavBar />
		<AppHeader />
		<main class="m-4 font-sans">
			<slot />
		</main>
	</div>
</Modal>

<style>
	@import url('../typography.css');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
