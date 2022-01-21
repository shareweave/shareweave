<script lang="ts">
	import { browser } from '$app/env';
	import UserAPI from '../lib/user';
	let user;
	let reactive = 0;
	if (browser) {
		user = new UserAPI();
	}
	async function login() {
		// wait for the  login
		await user.login();
		// then trigger reactivity
		user = user;
	}
	globalThis.user = user;

	let userNameField = '';
</script>

<div>
	{#if browser}
		<h1>User Demo</h1>
		<button on:click={login}>Login</button>
		<p>Is the user logged in? {user.isLoggedIn}</p>
		{#if user.isLoggedIn}
			<p>What's the user's name? {user.profile.name}</p>
			<p>Change the user name:</p>
			<form on:submit|preventDefault={() => user.setProfile({ name: userNameField })}>
				<input type="text" placeholder="name" bind:value={userNameField} />
				<button>Change</button>
			</form>
			<i>Currently, you must reload to see the updated name</i>
		{/if}
	{/if}
</div>
