<script>
	import Modal from 'svelte-simple-modal';
</script>

<Modal>
	<main class="m-4 font-sans">
		<slot />
	</main>
</Modal>

<style>
	@import url('./typography.css');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
