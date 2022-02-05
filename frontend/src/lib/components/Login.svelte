<script lang="ts">
	import Button from './Button.svelte';
	import TextInput from './TextInput.svelte';
</script>

<div class="mx-auto max-w-fit">
	<h1 class="text-center">👋 Welcome Back</h1>
	<p class="text-center my-3">
		No Account? <br />
		Just enter your email or connect a crypto wallet below.
	</p>
	<div class="mx-auto max-w-fit my-8">
		<form on:submit|preventDefault>
			<TextInput placeholder="you@example.com" label="Email" name="email" />
			<Button fullWidth={true} primary={true}>Login</Button>
		</form>
		<Button fullWidth={true}>Login With Crypto</Button>
	</div>
</div>
