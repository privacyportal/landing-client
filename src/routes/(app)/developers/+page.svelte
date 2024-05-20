<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    goto('/developers/api-docs', { replaceState: true });
  });
</script>
