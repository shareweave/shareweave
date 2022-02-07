<svelte:options tag={'shareweave-login'} />

<script lang="ts">
	import Button from './Button.svelte';
	import TextInput from './TextInput.svelte';
</script>

<div class="mx-auto max-w-fit">
	<h1 class="text-center">👋 Welcome Back</h1>
	<p class="my-3 text-center">
		No Account? <br />
		Just enter your email or connect a crypto wallet below.
	</p>
	<div class="mx-auto my-8 max-w-fit">
		<form on:submit|preventDefault>
			<TextInput placeholder="you@example.com" label="Email" name="email" />
			<Button fullWidth={true} primary={true}>Login</Button>
		</form>
		<Button fullWidth={true}>Login With Crypto</Button>
	</div>
</div>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
