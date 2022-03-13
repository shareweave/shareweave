<script lang="ts">
	import shareweave from '$lib/shareweave';
	import postcss from 'postcss';
	globalThis.shareweave = shareweave;
</script>

<h1>Post Demo (incomplete)</h1>

{#await shareweave.posts.query()}
	loading posts...
{:then posts}
	{#each posts as post}
		<h1>{#await post.get('title')}loading...{:then title} {title} {/await}</h1>
	{/each}
{/await}
