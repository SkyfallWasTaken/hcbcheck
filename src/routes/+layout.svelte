<script lang="ts">
  import "../app.css";
  import Footer from "$lib/footer.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <meta property="og:title" content="HCB Name Checker" />
  <meta
    property="og:description"
    content="Quickly check if a HCB name is available for your project or organisation."
  />
  <meta
    property="og:image"
    content="https://hcbcheck.skyfall.dev/hcb-icon.png"
  />
  <meta property="og:url" content="https://hcbcheck.skyfall.dev/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="HCB Name Checker" />
  <meta property="og:locale" content="en_US" />
  <link
    rel="icon"
    href={import.meta.env.DEV ? "/hcb-icon-dev.png" : "/hcb-icon.png"}
  />
  <title>HCB Checker</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
  <main class="flex flex-col items-center flex-grow mt-16">
    {@render children()}
  </main>

  <Footer />
</div>
