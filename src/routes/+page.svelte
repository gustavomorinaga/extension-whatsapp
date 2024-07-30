<script lang="ts" context="module">
	import { Button } from '$lib/components/ui/button';
	import { Center } from '$lib/components/ui/center';
	import { Spinner } from '$lib/components/ui/spinner';
	import { whatsAppWeb } from '$lib/utils';
	import Info from 'lucide-svelte/icons/info';
	import type { TWhatsAppChat, TWhatsAppContact, TWhatsAppMessage } from '$lib/ts';

	type TWhatsAppData = {
		currentChatID: string;
		currentChatMessages: Array<TWhatsAppMessage>;
		currentChatName?: string;
		currentChatObject: TWhatsAppChat;
		currentChatPhoneNumber: string;
		currentContactObject: TWhatsAppContact;
	};
</script>

<script lang="ts">
	let data: Partial<TWhatsAppData>;
	let state: 'idle' | 'loading' | 'success' | Error = 'idle';

	async function getData() {
		state = 'loading';

		try {
			const currentChatObject = await whatsAppWeb.getCurrentChatObject();
			if (!currentChatObject) throw new Error('No chat is open.');

			const [
				currentChatID,
				currentChatMessages,
				currentChatName,
				currentChatPhoneNumber,
				currentContactObject
			] = await Promise.all([
				whatsAppWeb.getCurrentChatID(),
				whatsAppWeb.getCurrentChatMessages(),
				whatsAppWeb.getCurrentChatName(),
				whatsAppWeb.getCurrentChatPhoneNumber(),
				whatsAppWeb.getCurrentContactObject()
			]);

			data = {
				currentChatID,
				currentChatMessages,
				currentChatName,
				currentChatObject,
				currentChatPhoneNumber,
				currentContactObject
			};

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
