<script>
  import { getTreeItem, updateTreeItem } from './editor.js';
  import AFIcon from '/++api++/~/abfab/ui/icon.svelte';
  export let item;

  const toggle = () => {
    updateTreeItem({ ...item, expanded: !item.expanded });
  };

  const click = () => {
    const currentSelected = getTreeItem(
      window.location.pathname.replace('/@edit', ''),
    );
    if (currentSelected) {
      updateTreeItem({ ...currentSelected, selected: false });
    }
    updateTreeItem({ ...item, selected: true });
  };
</script>

{#if item.type === 'Directory'}
  <AFIcon
    size="small"
    on:click={toggle}
    icon={item.expanded ? 'chevron-down' : 'chevron-right'}
  />
{:else}
  <AFIcon size="small" on:click={toggle} icon="file" />
{/if}
<a href={`${item.path}/@edit`} class:selected={item.selected} on:click={click}
  >{item.name}</a
>
{#if item.children && item.expanded}
  <ul>
    {#each item.children as item}
      <li class:secondary={item.path.endsWith('.svelte.js')}>
        <svelte:self {item} />
      </li>
    {/each}
  </ul>
{/if}
