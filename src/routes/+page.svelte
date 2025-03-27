<script lang="ts">
  import { Debounced } from "runed";
  let slug = $state("");
  const debounced = new Debounced(() => slug, 500);
</script>

<div class="space-y-4">
  <h1 class="text-5xl text-center font-extrabold text-ctp-rosewater">
    Is that HCB org taken?
  </h1>
  <input
    type="text"
    placeholder="Enter org name"
    class="w-full bg-input border-border border rounded-md py-4 px-6 mb-4 text-2xl"
    bind:value={slug}
  />

  {#if debounced.current.trim() !== ""}
    <div class="py-4 px-6 rounded-md border-border border w-full transition">
      {#await fetch(`/api/check-slug/${debounced.current.trim()}`).then( (res) => res.json() )}
        <p class="text-2xl">Loading...</p>
      {:then data}
        {#if data.valid}
          <p class="text-green-500 text-2xl">This name isn't taken!</p>
        {:else}
          <p class="text-red-500 text-2xl">This name is taken.</p>
          <a
            href={`https://hcb.hackclub.com/${debounced.current}`}
            class="underline text-md">View on HCB</a
          >
        {/if}
      {:catch error}
        <p>Error: {error.message}</p>
        <pre>{error.stack}</pre>
      {/await}
    </div>
  {/if}
</div>
