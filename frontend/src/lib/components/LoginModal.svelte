<svelte:options tag={'shareweave-login-modal'} />

<script>
	export let show = false;
	import { getContext } from 'svelte';
	import Modal from 'svelte-simple-modal';
	import Login from './Login.svelte';
</script>

{#if show}
	<Login />
{/if}
