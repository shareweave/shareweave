<script lang="ts">
	export let primary = false;
	export let danger = false;
	export let fullWidth = false;
	export let href = '';
	let className = '';
	export { className as class };

	const primaryStyle = 'bg-brand hover:bg-brand-light text-white';
	const secondaryStyle = 'text-brand hover:bg-background-darker';
	const dangerStyle = 'bg-red !border-red hover:opacity-80 text-white';

	const props = {
		class: `my-2 mr-4 p-2 px-5 border-2 rounded-xl border-brand no-link-style
		${primary ? primaryStyle : ''} 
		${!primary && !danger ? secondaryStyle : ''} 
		${danger ? dangerStyle : ''}
		${fullWidth ? 'w-full' : ''}
		${className} `
	};
</script>

{#if href !== ''}
	<a {href} {...props}><slot /></a>
{:else}
	<button on:click {...props}><slot /></button>
{/if}

<style global lang="postcss">
	@import '../webcomponents/build/output.css';
</style>
