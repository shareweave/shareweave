<svelte:options tag={null} />

<script>
	import Button from '@components/Button.svelte';
</script>

<svelte:head>
	<title>Shareweave</title>
</svelte:head>

<div class="bg-background-darker px-4 pt-5 pb-36">
	<div class="mx-auto max-w-prose text-center">
		<img class="mx-auto w-20" alt="logo" src="logo-unfilled.png" />
		<h1 class="mb-2">Shareweave,</h1>
		<h2 class="text-secondary mb-12 font-normal">content sharing with low code</h2>
		<Button
			href="https://forms.zohopublic.com/shareweave/form/BetaTesterApplication/formperma/5_OJkUFacvNrSwNQGAqk-DQYQFG4cEGGAB-0qD-Gv8Q?referrername=shareweave.com"
			class="text-bold hover:border-brand-light !py-4 font-semibold"
			primary={true}
		>
			Become a beta tester 🚀
		</Button>
	</div>
</div>

<div class="mx-auto mt-4 max-w-prose -translate-y-32 px-4 text-center">
	<img alt="People" src="people.png" />
	<p>
		Customize your decentralized community from the ground up. Fast, simple, and with all the
		benefits of web3.
	</p>

	<b>Introducing the first social CMS.</b>

	<h3 class="mt-6">✨ Easy APIs</h3>
	<p>Ready to save months of development time?</p>
	<img class="mx-auto" alt="Code" src="code.png" />
	<h3 class="mt-6">👥 Easy Moderation</h3>
	<p>
		Creating a quality moderation platform might not be worth it for your company. We’ve created it
		for you.
	</p>
	<img class="mx-auto" alt="Moderation" src="moderation.png" />

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

	<img class="mx-auto mt-8" alt="Arweave" src="arweave.png" />
	<h3 class="mt-1">Built to last on Arweave</h3>
	<p class="-mb-16 ">
		Arweave enables storage of documents and applications permanently, with no access or bandwidth
		fees.
	</p>
</div>

<div class="bg-brand px-4 pt-8 text-white">
	<div class="mx-auto max-w-prose text-center">
		<h1 class="mb-2">Sounds Cool? Get Early Access.</h1>
		<p>If you want to create amazing communities, apply below to become a beta tester.</p>
		<div class="mx-auto my-8 mb-14 max-w-fit">
			<Button
				href="https://forms.zohopublic.com/shareweave/form/BetaTesterApplication/formperma/5_OJkUFacvNrSwNQGAqk-DQYQFG4cEGGAB-0qD-Gv8Q?referrername=shareweave.com"
				class="text-bold !bg-bright !py-4 font-semibold hover:brightness-110"
				primary={true}
			>
				Become a beta tester 🚀
			</Button>
		</div>

		<img class="mx-auto w-72" alt="" src="bike-riding.svg" />
		<p class="my-8 mb-16">
			Interested in using shareweave to improve engagement with your company? Maybe your app needs a
			plugin store, theme store, awesome list, or support forum? Want to start a social application?
			Or just have some more questions? Email <a href="mailto:ian@shareweave.com"
				>ian@shareweave.com</a
			>
		</p>
		<footer>
			<p class="p-2">Copyright (c) Shareweave 2022</p>
			<p class="p-6 pt-0">
				<a class="mx-1" href="https://twitter.com/shareweave">Twitter</a> -
				<a class="mx-1" href="https://github.com/shareweave">Github</a>
			</p>
		</footer>
	</div>
</div>

<style>
	.bg-brand a {
		@apply font-semibold text-white;
	}
</style>
