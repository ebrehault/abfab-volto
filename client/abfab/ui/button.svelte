<script>
    import AFIcon from '/++api++/~/abfab/ui/icon.svelte';
    export let icon;
    export let size = 'medium'; // small, medium, large
    export let aspect = 'solid'; // solid or basic
    export let kind = 'secondary'; // primary, secondary, destructive
    export let active = false;
    export let disabled = false;
    export let type = 'button';
    let label;
</script>
<button class="pa-button pa-{size} pa-{kind} pa-{aspect}"
    class:pa-active={active}
    class:pa-button-icon={icon}
    type={type} aria-label={label ? label.textContent : ''} tabindex="0" disabled={disabled}
    on:click>
    <span tabindex="-1" class="pa-button-wrapper">
        {#if icon}
        <AFIcon {size} {icon}></AFIcon>
        {/if}
        <span class="pa-button-label" class:pa-sr-only={!!icon} bind:this={label}><slot/></span>
    </span>
</button>