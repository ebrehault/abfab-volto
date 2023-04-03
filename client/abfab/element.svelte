<svelte:options tag="abfab-element" />

<script>
  import { getRealPath, API } from '/++api++/~/abfab/core.js';
  import { onMount } from 'svelte';

  export let componentpath;
  export let contentpath;
  let component;
  let content;

  onMount(async () => {
    const module = await import(getRealPath(componentpath));
    component = module.default;
    if (contentpath) {
      const response = await API.get(contentpath);
      content = await response.json();
    }
  });
</script>

{#if component && content}
  <svelte:component this={component} {content} />
{/if}
{#if component && !contentpath}
  <svelte:component this={component} />
{/if}
