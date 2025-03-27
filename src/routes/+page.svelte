<script lang="ts">
  import { Debounced } from "runed";
  let slug = $state("");

  const REGEX = /[^A-Za-z0-9-]/g;
  const debounced = new Debounced(
    () => slug.toLowerCase().replace(REGEX, ""),
    500
  );

  let inputEl: HTMLInputElement;

  let data: { valid: boolean } | null = $state(null);
  async function check() {
    data = await fetch(`/api/check-slug/${debounced.current.trim()}`).then(
      (res) => res.json()
    );
  }
</script>

<div class="max-w-2xl mx-auto py-10 px-4">
  <h1 class="text-5xl text-center font-extrabold mb-8">
    Is that HCB org taken?
  </h1>

  <div class="relative mb-8">
    <input
      type="text"
      pattern="^[a-z0-9\-_]+$"
      placeholder="Enter org name"
      class="w-full {slug !== '' &&
        'lowercase'} bg-input border-border border rounded-lg py-4 px-6 text-2xl shadow-sm focus:ring-2 transition"
      bind:value={slug}
      bind:this={inputEl}
      oninput={() => (inputEl.value = inputEl.value.replace(REGEX, ""))}
    />
    {#if slug}
      <button
        class="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        onclick={() => (slug = "")}
      >
        ✕
      </button>
    {/if}
  </div>

  {#if debounced.current.trim() !== ""}
    <div
      class="py-6 px-8 rounded-lg border-border border w-full transition-all duration-300 shadow-sm text-background {data?.valid
        ? 'bg-green-500'
        : 'bg-red-500'}"
    >
      {#await check()}
        <div class="flex items-center justify-center py-4">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2"></div>
          <p class="text-2xl font-semibold ml-4">Checking availability...</p>
        </div>
      {:then}
        <div class="text-center">
          {#if data?.valid}
            <div class="flex items-center justify-center mb-2">
              <svg
                class="w-8 h-8 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <p class="text-2xl font-semibold text-background">
                This name is available!
              </p>
            </div>
            <p class="text-background/80">
              You can use "{debounced.current}" for your HCB organization.
            </p>
          {:else}
            <div
              class="flex items-center justify-center text-foreground/90 mb-2"
            >
              <svg
                class="w-8 h-8 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              <p class="text-2xl font-semibold">This name is taken.</p>
            </div>
            <a
              href={`https://hcb.hackclub.com/${debounced.current}`}
              class="inline-block mt-2 px-4 py-2 bg-primary hover:bg-primary/80 text-gray-800 rounded-md shadow-sm transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on HCB →
            </a>
          {/if}
        </div>
      {:catch error}
        <div class="bg-red-50 text-red-800 p-4 rounded-md">
          <p class="font-semibold">Error occurred:</p>
          <p>{error.message}</p>
        </div>
      {/await}
    </div>
  {/if}

  <p class="text-center text-gray-500 mt-8 text-sm">
    Check if a HCB organization name is available with this checker.
  </p>
</div>
