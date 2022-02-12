<script lang="ts">
	import Icon from '@iconify/svelte';
	const title = `Ian's Space`;
	const navItems = [
		{
			text: 'Projects',
			icon: 'collection',
			link: 'projects'
		},
		{
			text: 'Analytics',
			icon: 'trending-up',
			link: 'analytics'
		},
		{
			text: 'Billing',
			icon: 'credit-card',
			link: 'billing'
		},
		{
			text: 'Team Settings',
			icon: 'cog',
			link: '/app/user-demo'
		}
	];
</script>

<nav class="bg-background-darker row-span-2 h-full p-3">
	<h1 class="text-center">{title}</h1>
	<ul>
		{#each navItems as navItem}
			<a class="no-link-style" href={navItem.link}>
				<li class="hover:bg-darken my-1 p-2">
					<Icon icon={`heroicons-outline:${navItem.icon}`} />
					<span class="ml-2">{navItem.text}</span>
				</li>
			</a>
		{/each}
	</ul>
</nav>
