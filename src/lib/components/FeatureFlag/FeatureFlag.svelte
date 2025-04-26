<script lang="ts">
    import { FeatureFlags } from "$lib/config";

    let {flag, children} = $props();

    const IsFeatureFlag =  (flag:string): boolean=>{

        return FeatureFlags[flag] === true
    }

</script>

{#if IsFeatureFlag(flag)}
    {@render children()}
{/if}