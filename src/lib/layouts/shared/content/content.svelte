<script lang="ts" context="module">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
</script>

<script lang="ts">
	type $$Props = HTMLAttributes<HTMLElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<main class={cn('flex h-full w-full flex-1 flex-col', className)}>
	<slot />
</main>
