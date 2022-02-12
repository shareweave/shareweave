<script lang="ts">
	import Icon from '@iconify/svelte';

	export let navItems = [
		{
			text: 'Dashboard',
			link: 'dashboard'
		},
		{
			text: `Ian's Team`,
			link: ''
		},
		{
			text: `Ian's Team`,
			link: ''
		}
	];
</script>

<header class="m-4 flex">
	<div class="mt-2">
		{#each navItems as item, index}
			<a
				class="no-link-style mr-3 rounded-3xl"
				class:bg-background-darker={index === navItems.length - 1}
				class:px-4={index === navItems.length - 1}
				class:p-2={index === navItems.length - 1}
				href={item.link}>{item.text}</a
			>
			{#if index != navItems.length - 1}
				<Icon class="mr-3" icon="heroicons-outline:chevron-right" />
			{/if}
		{/each}
	</div>
	<div class="flex-grow" />
	<div class="grid auto-rows-min grid-cols-[3rem_1fr] gap-x-2">
		<img
			alt="Avatar"
			class="row-span-2 h-full w-full rounded object-fill"
			src="https://images.unsplash.com/photo-1643967377110-c17a5ddf14f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
		/>
		<span class="text-lg font-medium">Ian</span>
		<span class="text-secondary">ian@shareweave.com</span>
	</div>
</header>
