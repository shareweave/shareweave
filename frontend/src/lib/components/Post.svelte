<script lang="ts">
	import type PostItem from 'shareweave/build/src/posts/item';
	export let post: PostItem;
	import Button from './Button.svelte';
	import Card from './Card.svelte';
	import { formatRelative } from 'date-fns';
	import specialTags from 'shareweave/src/utils/specialTags';
	let data = post.tags;
	post.getData().then((postData) => {
		data = { ...data, ...postData };
	});
</script>

<Card>
	<h2>{post.tags.title[0]}</h2>
	<p class="text-secondary">
		By {post.tags.address} posted {post.meta.time === 0
			? 'recently'
			: formatRelative(new Date(post.meta.time), new Date())}
	</p>
	{#each Object.keys(data) as item}
		{#if !specialTags.includes(item)}
			<p>{item}: {data[item]}</p>
		{/if}
	{/each}
	<Button primary={true}>Approve Post</Button>
	<Button danger={true}>Moderate</Button>
	<Button>Details</Button>
</Card>
