<script lang="ts">
	import Icon from '@iconify/svelte';
	import shareweave, { isLoggedIn } from '$lib/shareweave';
	globalThis.hshareweave = shareweave;
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
		{#if $isLoggedIn}
			<img
				alt="Avatar"
				class="row-span-2 h-full w-full rounded object-fill"
				src={shareweave.user.profile.getImage(0, 0).httpSrc}
			/>
			<span class="text-lg font-medium">{shareweave.user.profile.name}</span>
			<span class="text-secondary w-32 overflow-hidden text-ellipsis">
				{shareweave.user.profile.address}
			</span>
		{/if}
	</div>
</header>
