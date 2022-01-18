<script lang="ts">
	import('../lib/user').then((user) => {
		console.log(user);
	});
	let count = 0;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={() => count++}>{count}</button>
