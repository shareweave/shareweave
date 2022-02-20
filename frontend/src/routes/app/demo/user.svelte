<script lang="ts">
	import { browser } from '$app/env';
	import Shareweave from 'shareweave';

	let user;
	if (browser) {
		user = new Shareweave('').user;
	}
	// globalThis.user = user;

	let userNameField = '';

	let loggingIn = false;

	async function login() {
		loggingIn = true;
		// wait for the  login
		await user.login();
		// then trigger reactivity
		user = user;
	}
	let messageToSign = '';
	globalThis.user = user;
</script>

<svelte:window on:load={login} />
<div>
	{#if browser}
		<h1>User Demo</h1>
		<p>Is the user logged in? {loggingIn && !user.isLoggedIn ? 'waiting...' : user.isLoggedIn}</p>
		{#if user.isLoggedIn}
			<p>What's the user's name? {user.profile.name}</p>
			<p>What's the user's address? {user.profile.address}</p>
			<p>Image:</p>
			<img alt="Avatar" src={user.profile.getImage(0, 0).httpSrc} />
			<p>Sign message:</p>
			<form
				on:submit|preventDefault={async () => {
					const signature = await user.sign(messageToSign);
					const derivedUser = user.verify(messageToSign, signature);
					alert(`${messageToSign} signed by ${derivedUser} = ${signature}`);
				}}
			>
				<input type="text" placeholder="name" bind:value={messageToSign} />
				<button>Sign</button>
			</form>

			<p>Change the user name:</p>
			<form on:submit|preventDefault={() => user.setProfile({ name: userNameField })}>
				<input type="text" placeholder="name" bind:value={userNameField} />
				<button>Change</button>
			</form>
			<i>Currently, you must reload to see the updated name</i>

			<button on:click={user.logout}>Logout</button>
		{/if}
	{/if}
</div>
