<script lang="ts">
	import Button from './Button.svelte';
	import Card from './Card.svelte';

	const data = {
		title: 'IBM’s Watson Health is sold off in parts',
		something: 'lorem ipsum',
		random: 'hello there people',
		number: 1345
	};
</script>

<Card>
	<h2>{data.title}</h2>
	<p class="text-secondary">By someuser on Jan. 1 2022</p>
	{#each Object.keys(data) as item}
		{#if item !== 'title'}
			<p>{item}: {data[item]}</p>
		{/if}
	{/each}
	<Button primary={true}>Approve Post</Button>
	<Button danger={true}>Moderate</Button>
	<Button>Details</Button>
</Card>
