<script lang="ts">
	import Selector from '@components/Selector.svelte';
	import Post from '@components/Post.svelte';

	import shareweave from '$lib/shareweave';
	const posts = shareweave.posts;
	globalThis.posts = posts;
</script>

<h1>Moderation</h1>

<Selector options={['Awaiting Moderation', 'All']} name="test" />

{#await shareweave.user.login()}
	logging in...
{:then}
	<div class="mt-8">
		{#await posts.query()}
			loading posts...
		{:then postList}
			{#each postList.data as post}
				{#if post} <Post {post} /> {/if}
			{/each}
		{:catch error}
			<p>Whoops, an error occurred when fetching posts</p>
			<code>{error}</code>
		{/await}
	</div>
{:catch error}
	<p>Whoops, an error occurred when logging in</p>
	<code>{error}</code>
{/await}
