<script lang="ts">
	import Shareweave from 'shareweave';
	const posts = new Shareweave('shareweave-demo-blog').posts;
	globalThis.posts = posts;
</script>

<h1>Post Demo</h1>
