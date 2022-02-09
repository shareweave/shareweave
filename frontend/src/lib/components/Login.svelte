<svelte:options tag={'shareweave-login'} />

<script lang="ts">
	import Button from './Button.svelte';
	import TextInput from './TextInput.svelte';

	let email = '';
	function login() {
		window.alert(email);
	}
</script>

<div class="mx-auto max-w-fit">
	<div class="grid grid-cols-3">
		<span />
		<h1 class="text-center">👋 Welcome Back</h1>
		<span class="-mt-3 flex items-center justify-end text-right text-3xl">
			<button on:click={() => alert('hello')}>&#xd7;</button></span
		>
	</div>
	<p class="my-3 text-center">
		No Account? <br />
		Just enter your email or connect a crypto wallet below.
	</p>
	<div class="mx-auto my-8 max-w-fit">
		<form>
			<shareweave-text-input
				placeholder="you@example.com"
				label="Email"
				name="email"
				value={email}
			/>
			<shareweave-button fullwidth={true} primary={true}>Login</shareweave-button>
		</form>
		<span><shareweave-button fullwidth={true}>Login With Crypto</shareweave-button></span>
	</div>
</div>

<style lang="postcss">
	@import '../webcomponents/build/output.css';
</style>
