<script lang="ts">
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function cancel() {
		dispatch('cancel');
	}
	function moderate() {
		if (confirm('Are you sure you want to permanently hide this post?')) {
			dispatch('moderate');
		} else {
			dispatch('cancel');
		}
	}
</script>

<h1>Moderate</h1>
<p class="mb-6">Remove this post from your app's view</p>
<Button on:click={cancel}>Cancel</Button>
<Button danger={true} on:click={moderate}>Delete Post</Button>
