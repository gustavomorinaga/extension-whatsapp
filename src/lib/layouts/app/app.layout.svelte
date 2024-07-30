<script lang="ts" context="module">
	import { Content } from '$lib/layouts/shared/content';
	import { Wrapper } from '$lib/layouts/shared/wrapper';
</script>

<Wrapper>
	<Content class="container">
		<slot />
	</Content>
</Wrapper>
