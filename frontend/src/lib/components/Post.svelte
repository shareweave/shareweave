<script lang="ts">
	import type PostItem from 'shareweave/build/src/posts/item';
	export let post: PostItem<{ [key: string]: any }>;
	import Button from './Button.svelte';
	import Card from './Card.svelte';
	import { formatRelative } from 'date-fns';
	import specialTags from 'shareweave/src/utils/specialTags';
	import Modal from './Modal.svelte';
	import Moderate from './Moderate.svelte';
	let postData;
	post.subscribe((data) => {
		postData = data;
	});
	let showModerationModal = false;
	let deleted = false;
</script>

{#if !deleted}
	<Card>
		<h2>{postData.title}</h2>
		<p class="text-secondary">
			By {post.meta.author} posted {post.meta.time === 0
				? 'recently'
				: formatRelative(new Date(post.meta.time), new Date())}
		</p>
		{#each Object.keys(postData) as item}
			{#if !specialTags.includes(item)}
				<p>{item}: {postData[item]}</p>
			{/if}
		{/each}
		<Button primary={true}>Approve Post</Button>
		<Button on:click={() => (showModerationModal = true)} danger={true}>Moderate</Button>
		<Button>Details</Button>
	</Card>
{/if}

<Modal show={showModerationModal}>
	<Moderate
		on:moderate={() => {
			post.delete();
			showModerationModal = false;
			deleted = true;
		}}
		on:cancel={() => (showModerationModal = false)}
	/>
</Modal>
