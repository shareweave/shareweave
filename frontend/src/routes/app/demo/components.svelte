<script lang="ts">
	import TextInput from '@components/TextInput.svelte';
	import Button from '@components/Button.svelte';
	import Card from '@components/Card.svelte';
	import Selector from '@components/Selector.svelte';
	import { getContext } from 'svelte';
	import Login from '@components/Login.svelte';
	import Post from '@components/Post.svelte';
	const { open } = getContext('simple-modal');
	const showLogin = () => open(Login, { message: "It's a modal!" });
</script>

<h1>Components Demo</h1>
<Button primary={true} on:click={showLogin}>Login</Button>
<Button danger={true} on:click={() => alert('dangerous button')}>Dangerous</Button>
<Button on:click={() => alert('secondary button')}>Secondary Button</Button>

<p class="my-6">
	<Selector options={['Option one', 'Better Option', 'Best 🚀🚀🚀']} name="test" />
</p>
<TextInput placeholder="you@example.com" label="Email" name="email" />

<Card>
	<h2>Hello there</h2>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
	<a href="http://www.w3.org/">Link</a>
</Card>

<div class="flex"><Post /></div>

<h1>Typography</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<p>Paragraph 2</p>
<p>Lorem ipsum dolor sit amet, consectetur adip elit</p>
