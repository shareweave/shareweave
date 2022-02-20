<script lang="ts">
	import Selector from '@components/Selector.svelte';
	import Post from '@components/Post.svelte';

	import Shareweave from 'shareweave';
	const shareweave = new Shareweave('shareweave-test');
	const posts = shareweave.posts;
	globalThis.posts = posts;
</script>

<h1>Moderation</h1>

<Selector options={['Awaiting Moderation', 'All']} name="test" />

<div class="mt-8">
	{#await posts.query()}
		waiting...
	{:then postList}
		{#each postList.data as post}
			{#if post} <Post {post} /> {/if}
		{/each}
	{:catch error}
		<p>Whoops, an error occurred</p>
		<code>{error}</code>
	{/await}
</div>
