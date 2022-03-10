<script lang="ts">
	export let show = false;
	import Button from './Button.svelte';
	import TextInput from './TextInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import { Magic } from 'magic-sdk';
	const dispatch = createEventDispatcher();
	console.log(import.meta.env.MAGIC_API_KEY);
	const magic = new Magic('pk_live_27C349CE900303AA' as string, {
		testMode: import.meta.env.DEV
	});
	globalThis.magic = magic;
	let email = '';
	let error;
	async function loginWithEmail() {
		try {
			await magic.auth.loginWithMagicLink({ email });
			dispatch('login', {
				web3Provider: magic.rpcProvider
			});
		} catch (e) {
			error = e;
		}
	}
	async function login() {
		if (!window.ethereum) alert("Metamask isn't installed");
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		dispatch('login', {
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
		<p class="text-red">{error || ''}</p>
		<div class="mx-auto my-8 max-w-fit">
			<form on:submit|preventDefault={loginWithEmail}>
				<TextInput placeholder="you@example.com" label="Email" name="email" bind:value={email} />
				<Button fullWidth={true} primary={true}>Login</Button>
			</form>
			<Button fullWidth={true} on:click={login}>Login With MetaMask</Button>
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
