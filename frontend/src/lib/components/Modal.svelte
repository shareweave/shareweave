<script lang="ts">
	export let show = false;
</script>

<div id="shareweave-modal" class:hidden={!show} tabindex="-1">
	<div
		class="mx-auto min-w-[10rem] max-w-fit rounded-xl bg-white p-4 px-8 text-center"
		role="dialog"
		aria-modal="true"
	>
		<slot />
	</div>
</div>

<style global lang="postcss">
	#shareweave-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* stop the styles above from overriding tailwind hidden */
	#shareweave-modal.hidden {
		display: none;
	}
</style>
