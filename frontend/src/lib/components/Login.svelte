<script lang="ts">
	export let show = false;
	import Button from './Button.svelte';
	import TextInput from './TextInput.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let email = '';
	function login() {
		// @ts-expect-error metamask does not have types rn
		if (!window.ethereum) throw new Error('window.ethereum required for now, install metamask');
		dispatch('login', {
			// @ts-expect-error metamask does not have types rn
			web3Provider: window.ethereum
		});
	}
</script>

<div id="shareweave-login-modal" class:hidden={show === false} tabindex="-1">
	<div
		id="shareweave-login"
		class="mx-auto max-w-fit rounded-xl bg-white p-3"
		role="dialog"
		aria-modal="true"
	>
		<div class="grid grid-cols-[0.5fr_1fr_0.5fr]">
			<span />
			<h1 class="text-center">👋 Welcome Back</h1>
			<span class="-mt-3 flex items-center justify-end px-4 text-right text-3xl">
				<!--  cancel login tbd 
				<button>&#xd7; </button> -->
			</span>
		</div>
		<p class="my-3 text-center">
			No Account? <br />
			Just enter your email or connect a crypto wallet below.
		</p>
		<div class="mx-auto my-8 max-w-fit">
			<form on:submit|preventDefault={() => alert('not yet implemented')}>
				<TextInput placeholder="you@example.com" label="Email" name="email" value={email} />
				<Button fullWidth={true} primary={true}>Login</Button>
			</form>
			<Button fullWidth={true} on:click={login}>Login With Crypto</Button>
		</div>
	</div>
</div>

<style global lang="postcss">
	@import '../webcomponents/build/output.css';

	#shareweave-login-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* stop the styles above from overriding tailwind hidden */
	#shareweave-login-modal.hidden {
		display: none;
	}
</style>
