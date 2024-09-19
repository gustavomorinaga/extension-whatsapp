<script lang="ts" context="module">
	import { Button } from '$lib/components/ui/button';
	import { Center } from '$lib/components/ui/center';
	import { Spinner } from '$lib/components/ui/spinner';
	import { whatsAppWeb } from '$lib/utils';
	import Info from 'lucide-svelte/icons/info';
</script>

<script lang="ts">
	let data: Awaited<ReturnType<typeof whatsAppWeb.getData>>;
	let state: 'idle' | 'loading' | 'success' | Error = 'idle';

	async function getData() {
		state = 'loading';

		try {
			const chat = await whatsAppWeb.getData();
			if (!chat) throw new Error('No chat is open.');

			data = chat;

			state = 'success';
		} catch (error) {
			state = error as Error;
		}
	}

	$: if (data) console.log('Extension for WhatsApp', data);
	$: if (state instanceof Error) console.warn('Extension for WhatsApp', state);
</script>

<section class="flex flex-1 flex-col">
	<Center class="flex-1 gap-8">
		<header class="text-center">
			<h1 class="mb-4 text-2xl font-extrabold">Extension for WhatsApp</h1>
			<p class="text-balance text-sm text-muted-foreground">
				Open a chat in WhatsApp Web and click the button below to get the data of the current chat.
			</p>
		</header>

		<Button size="lg" disabled={state === 'loading'} on:click={getData}>
			{#if state === 'loading'}
				<Spinner class="mr-2 shrink-0" />
				Getting Data...
			{:else}
				Get Data
			{/if}
		</Button>

		{#if state === 'success'}
			<div class="flex items-center">
				<Info class="mr-2 size-4 shrink-0" />
				<p>Check the console to see the data.</p>
			</div>
		{/if}
	</Center>
</section>
