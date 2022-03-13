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
	let data = { email: '', password: '', username: '', signUp: false };
	let error;
	function loginWithUsername() {
		if (confirm("You can't recover your password. Have you written it down?"))
			dispatch('login', data);
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
			<h1 class="text-center">👋 {data.signUp ? 'Hey, Welcome!' : 'Welcome Back'}</h1>
			<span class="-mt-3 flex items-center justify-end px-4 text-right text-3xl">
				<!--  cancel login tbd 
				<button>&#xd7; </button> -->
			</span>
		</div>
		<p class="my-3 text-center">
			{#if data.signUp === false}
				No Account? <button class="link" on:click={() => (data.signUp = true)}>Sign Up</button>
			{/if}
			{#if data.signUp === true}
				Have an Account? <button class="link" on:click={() => (data.signUp = false)}>Log In</button>
				<br />
				You can't currently reset your password, so write it down!
			{/if}
		</p>
		<p class="text-red">{error || ''}</p>
		<div class="mx-auto my-8 max-w-fit">
			<form on:submit|preventDefault={loginWithUsername}>
				{#if data.signUp === true}
					<TextInput
						placeholder="you@example.com"
						label="Email"
						name="email"
						type="email"
						bind:value={data.email}
					/>
				{/if}
				<TextInput
					placeholder="cool username"
					label="Username"
					name="username"
					bind:value={data.username}
				/>
				<TextInput
					placeholder="password"
					label="Password"
					name="password"
					type="password"
					bind:value={data.password}
				/>
				<Button fullWidth={true} primary={true}>Login</Button>
			</form>
			<!--	<Button fullWidth={true} on:click={login}>Login With MetaMask</Button> -->
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
