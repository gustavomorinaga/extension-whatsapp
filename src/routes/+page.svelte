<script lang="ts" context="module">
	import { Button } from '$lib/components/ui/button';
	import { Center } from '$lib/components/ui/center';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Spinner } from '$lib/components/ui/spinner';
	import { whatsAppWeb } from '$lib/utils';
	import Info from 'lucide-svelte/icons/info';
	import Send from 'lucide-svelte/icons/send';
</script>

<script lang="ts">
	let data: Awaited<ReturnType<typeof whatsAppWeb.getData>>;
	let medias: Array<Awaited<ReturnType<typeof whatsAppWeb.processMedia>>>;
	let state: 'idle' | 'loading' | 'success' | Error = 'idle';

	async function getData() {
		state = 'loading';

		try {
			data = await whatsAppWeb.getData();
			if (data?.messages?.length) {
				const mediaMessages = data.messages.filter(
					(message) => message.mimetype && message.type !== 'sticker'
				);
				if (!mediaMessages.length) medias = [];
				else {
					const results = await Promise.allSettled(mediaMessages.map(whatsAppWeb.processMedia));
					medias = results
						.filter((result) => result.status === 'fulfilled')
						.map((result) => result.value);
				}
			}

			state = 'success';
		} catch (error) {
			data = undefined;
			medias = [];
			state = error as Error;
		}
	}

	async function writeInChat(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const message = data.get('message') as string;

		await whatsAppWeb.writeInChat(message);
		form.reset();
	}

	$: if (data) console.log('📞 Extension for WhatsApp', data);
</script>

<article class="relative flex flex-1 flex-col gap-4 py-8">
	<section class="sticky top-0 z-10 -mx-8 -mt-8 flex flex-col gap-8 bg-background p-8">
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

		<form class="flex items-end gap-2" on:submit={writeInChat}>
			<div class="flex flex-1 flex-col gap-1.5">
				<Label for="message">Write Message</Label>
				<Input
					type="text"
					id="message"
					name="message"
					placeholder="Insert a message..."
					autocapitalize="on"
					autocomplete="off"
					autocorrect="on"
				/>
			</div>

			<Button size="icon" type="submit">
				<Send class="size-6 shrink-0" />
				<span class="sr-only select-none">Send</span>
			</Button>
		</form>
	</section>

	{#if state === 'success'}
		{#if data}
			<section class="-mx-8 max-h-[30svh] overflow-y-auto border-y px-8 py-4">
				<pre class="grid whitespace-break-spaces break-words">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			</section>
		{:else}
			<Center class="text-muted-foreground">
				<Info class="size-12 shrink-0" />
				<p class="text-center">No data found.</p>
			</Center>
		{/if}

		{#if medias?.length}
			<section class="flex flex-col gap-4">
				{#each medias as media}
					{#if media}
						{#if media.filetype.startsWith('audio')}
							<audio controls>
								<source src={media.mediaBase64} type={media.filetype} />
							</audio>
						{/if}

						{#if media.filetype.startsWith('image')}
							<img src={media.mediaBase64} alt={media.filename} />
						{/if}

						{#if media.filetype.startsWith('video')}
							<video controls>
								<source src={media.mediaBase64} type={media.filetype} />
								<track kind="captions" />
							</video>
						{/if}
					{/if}
				{/each}
			</section>
		{/if}
	{/if}
</article>
