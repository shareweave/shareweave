<script>
	import Button from '@components/Button.svelte';
	import TextInput from '@components/TextInput.svelte';
</script>

<div class="bg-background-darker pt-5 pb-36">
	<div class="max-w-prose mx-auto text-center">
		<img class="mx-auto" alt="logo" src="/static/logo.svg" />
		<h1 class="mb-2">Shareweave,</h1>
		<h2 class="font-normal text-secondary">build communities on web3 with low code</h2>
	</div>
</div>
<div class="max-w-prose mx-auto text-center -translate-y-32">
	<img alt="People" src="static/people.png" />
	<p>
		Customize your decentralized community from the ground up. Fast, simple, and with all the
		benefits of web3.
	</p>

	<b>Introducing the first social CMS.</b>

	<h3 class="mt-6">✨ Easy APIs</h3>
	<p>Ready to save months of development time?</p>
	<img class="mx-auto" alt="Code" src="static/code.png" />
	<h3 class="mt-6">👥 Easy Moderation</h3>
	<p>
		Creating a quality moderation platform might not be worth it for your company. We’ve created it
		for you.
	</p>
	<img class="mx-auto" alt="Moderation" src="static/moderation.png" />

	<h3 class="mt-6">🔒 Decentralized & censorship resistant</h3>
	<p>
		Everything is logged to the eco-friendly and permanent Arweave blockchain, so that communities
		can be moderated but not truly censored.
	</p>
	<p>
		Logins can be done with email, crypto wallets, or with your existing auth servers, so you can
		create the community your users want.
	</p>

	<h3 class="mt-6">🤗 100% Open Source</h3>
	<p>
		We want to give back to the community and avoid vendor lock-in, so the Shareweave platform will
		be open source!
	</p>

	<img class="mt-8 mx-auto" alt="Arweave" src="static/arweave.png" />
	<h3 class="mt-1">Built to last on Arweave</h3>
	<p>
		Arweave enables storage of documents and applications permanently, with no access or bandwidth
		fees.
	</p>
</div>

<div class="bg-brand pt-5 text-white">
	<div class="max-w-prose mx-auto text-center">
		<h1 class="mb-2">Sounds Cool? Get Early Access.</h1>
		<p>If you want to create amazing communities, apply below to become a beta tester.</p>
		<form class="mx-auto max-w-fit my-8">
			<TextInput type="email" placeholder="you@example.com" label="Email" name="email" />
			<Button class="bg-yellow text-bold font-semibold" fullWidth={true} primary={true}>
				Become a beta tester 🚀
			</Button>
		</form>
		<footer>
			<p class="p-2">Copyright (c) Shareweave 2022</p>
			<p class="pt-0 p-2">
				<a href="https://twitter.com/shareweave">Twitter</a> -
				<a href="https://github.com/shareweave">Github</a>
			</p>
		</footer>
	</div>
</div>

<style>
	footer a {
		@apply text-white mx-1 font-semibold;
	}
</style>
