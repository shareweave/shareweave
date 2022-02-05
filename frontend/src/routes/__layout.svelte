<script>
	import Modal from 'svelte-simple-modal';
</script>

<Modal>
	<main class="font-sans m-4">
		<slot />
	</main>
</Modal>

<style>
	@import url('./typography.css');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
